import React, {Component} from 'react';
import '../../stylesheets/preuse_inspections.scss';
import '../../stylesheets/inspection_forms.scss';
import Setup from '../../components/inspections/setup';
import Takedown from '../../components/inspections/takedown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Query, graphql } from 'react-apollo';
import { getPreuseInspectionQuery, savePreuseMutation } from '../../queries/inspections';

class PreuseForm extends Component {
  state = {
    date: new Date(),
    instructions: {},
    elementId: parseInt(this.props.match.params.element_id),
    newComments: {
      setup:{
        Equipment: {content: ""},
        Element: {content: ""},
        Environment: {content: ""}
      },
      takedown:{
        Equipment: {content: ""},
        Element: {content: ""},
        Environment: {content: ""}
      }
    },
    alertMessage: {},
    changed: false
  }

  resetTextboxes = () => {
    this.setState({
      newComments: {
        setup:{
          Equipment: {content: ""},
          Element: {content: ""},
          Environment: {content: ""}
        },
        takedown:{
          Equipment: {content: ""},
          Element: {content: ""},
          Environment: {content: ""}
        }
      }
    });
  }

  handleChange = event =>{
    if (event.target.attributes.type.value === "number"){
      // changing climbs number from takedown
      const {name, value} = event.target;
      const climbId = parseInt(event.target.getAttribute('climb-id'));

      this.setState(state => {
        const {takedownAttributes} = state;
        const climb = takedownAttributes.climbsAttributes.find(r => r.id === climbId);
        climb[name] = parseInt(value);
        return {
          takedownAttributes
        }
      })

    } else if (event.target.attributes.type.value === "textarea") {
      // changing comment
      const {name, value} = event.target;
      const inspection = event.target.getAttribute("inspection");

      this.setState(state => {
        const newComments = state.newComments;
        newComments[inspection][name].content = value;
        return Object.assign({}, state, {newComments: newComments})
      });
    } else if (event.target.attributes.type.value === "checkbox") {
      //chaning checkbox
      const {name, checked} = event.target;
      const inspection = event.target.getAttribute("inspection");
      
      this.setState(state => {
        const newAttrs = state[`${inspection}Attributes`];
        newAttrs.sectionsAttributes.find(s => s.title === name).complete = checked;
        return Object.assign({}, state, {[`${inspection}Attributes`]: newAttrs})
      });
    }
    this.setState({changed: true, alertMessage: {}});
  }

  handleDateChange = date => {
    this.setState({date: date})
  }

  // intentionally not using an arrow function so children will use the correct "this"
  renderUpdatedBy(){
    if (typeof(this.data) !== "undefined" && this.data.users.length > 0) {
      return (
        <div className="updated-by form-group">
          <h3>Updated by:</h3>
          {this.data.users.map((user, i) => {
            return <React.Fragment key={i}>
              {user.fullname}<br/>
            </React.Fragment>
          })}
        </div>
      )
    }
  }

  gatherDataFromState = () => {
    const date = this.state.date
    const formattedDate = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    const setupAttributes = {
      id: this.state.setupAttributes.id,
      sectionsAttributes: JSON.parse(JSON.stringify(this.state.setupAttributes.sectionsAttributes))
    };

    //clean up unneeded user data from comments
    setupAttributes.sectionsAttributes.forEach(section => {
      section.commentsAttributes.forEach(comment => {
        delete comment.user
      })
    })
    
    let takedownAttributes = null;
    if (this.state.takedownAttributes){
      const climbsCopy = JSON.parse(JSON.stringify(this.state.takedownAttributes.climbsAttributes));
      const climbsReduced = climbsCopy.map(climb => {
        delete climb["rope"];
        return climb;
      })

      takedownAttributes = {
        id: this.state.takedownAttributes.id,
        sectionsAttributes: JSON.parse(JSON.stringify(this.state.takedownAttributes.sectionsAttributes)),
        climbsAttributes: climbsReduced
      } // used JSON to deeply copy the state array - lodash is an alternative if I want to import it
      
      //clean up unneeded user data from comments
      takedownAttributes.sectionsAttributes.forEach(section => {
        section.commentsAttributes.forEach(comment => {
          delete comment.user
        })
      })
    }
    
    const data = {
      id: this.state.id,
      date: formattedDate,
      elementId: this.state.elementId,
      setupAttributes: setupAttributes,
      takedownAttributes: takedownAttributes
    };

    for(const insp in this.state.newComments){
      if (insp === "takedown" && takedownAttributes === null){
        continue;
      }
      for(const sectionTitle in this.state.newComments[insp]){
        if (data[`${insp}Attributes`]){
          const section = data[`${insp}Attributes`].sectionsAttributes.find(s => s.title === sectionTitle);

          section.commentsAttributes.push({
            id: null,
            content: this.state.newComments[insp][sectionTitle].content
          })
        }
      }
    }

    return data;
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.gatherDataFromState();

    this.props.savePreuseMutation({
      variables: {data: data}
    }).then(({data: {savePreuse: {status, errors, preuseInspection}}}) => {
      if (status === "200"){
        this.props.history.push(`/preuse_inspections/elements/${this.state.elementId}/edit`);
        this.setState({
          ...preuseInspection,
          alertMessage: {
            type: "success",
            message: ["Inspection successfully saved"]
          },
          changed: false
        }, () => this.resetTextboxes());
      } else {
        this.setState({
          alertMessage: {
            type: "",
            message: errors
          }
        })
      }
    })
  }

  renderAlert = () => {
    const alerts = this.state.alertMessage;
    if (Object.keys(alerts).length > 0) {
      return (
        <div className={`alert alert-${alerts.type}`}>
        <ul>
            {alerts.message.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )
    }
  }

  queryCompleted = resp => {
    if (resp.preuseInspection.id !== null){
      this.props.history.push(`/preuse_inspections/elements/${resp.id}/edit`);
      this.setState({alertMessage: {
        type:"info",
        message:["Previous inspection loaded"],
        changed: false}});
    } else {
      this.props.history.push(`/preuse_inspections/elements/${resp.id}/new`);
      this.setState({alertMessage: {}, changed: false});
    }
    this.resetTextboxes();
    this.updateStateFromQuery(resp);
  }

  updateStateFromQuery = data => {
    this.setState({
      id: data.preuseInspection.id,
      setupAttributes: data.preuseInspection.setupAttributes,
      takedownAttributes: data.preuseInspection.takedownAttributes,
      instructions: {
        setup: {
          equipmentInstructions: data.setupEquipmentInstructions,
          elementInstructions: data.setupElementInstructions,
          environmentInstructions: data.setupEnvironmentInstructions,
        },
        takedown: {
          equipmentInstructions: data.takedownEquipmentInstructions,
          elementInstructions: data.takedownElementInstructions,
          environmentInstructions: data.takedownEnvironmentInstructions,
        }
      }
    });
  }

  render() {
    return (
      <Query
        query={getPreuseInspectionQuery}
        variables={{
          elementId: this.state.elementId,
          date: this.state.date.getDate() + "/" + (this.state.date.getMonth()+1) + "/" + this.state.date.getFullYear()
        }}
        fetchPolicy="network-only"
        onCompleted={(data)=> this.queryCompleted(data.element)}
        onError={(error) => console.log(error)}>

        {({loading}) => {
          if (loading) return null;
          return <>
          {this.renderAlert()}

          <div id="preuse-inspection-form">
            <form onSubmit={this.handleSubmit.bind(this)} >
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <DatePicker selected={this.state.date} name="date" className="form-control-sm" onChange={this.handleDateChange} />
              </div>

              {this.state.setupAttributes ?
                <Setup data={this.state.setupAttributes}
                  renderUpdatedBy={this.renderUpdatedBy}
                  handleChange={this.handleChange}
                  instructions={this.state.instructions.setup}
                  newComments={this.state.newComments.setup}
                /> : null}

              {this.state.takedownAttributes ?
                <><hr /><Takedown data={this.state.takedownAttributes}
                  renderUpdatedBy={this.renderUpdatedBy}
                  handleChange={this.handleChange}
                  instructions={this.state.instructions.takedown}
                  newComments={this.state.newComments.takedown}
                /></> : null}

                <input type="submit" id="submit-button" value={this.state.changed ? "Submit": "No changes yet"} disabled={!this.state.changed}/>
              </form>
            </div>
          </>
        }}
      </Query>
    )
  }
}

export default graphql(savePreuseMutation, {
  name: "savePreuseMutation"
})(PreuseForm);