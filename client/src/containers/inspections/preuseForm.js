import React, {Component} from 'react';
import '../../stylesheets/preuse_inspections.scss';
import '../../stylesheets/inspection_forms.scss';
import axios from 'axios';
import Setup from '../../components/inspections/setup';
import Takedown from '../../components/inspections/takedown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Query } from 'react-apollo';
import { getPreuseInspectionQuery } from '../../queries/inspections';

class PreuseForm extends Component {
  state = {
    date: new Date(),
    instructions: {},
    id: parseInt(this.props.match.params.element_id),
    newComments: {
      setup:{
        equipment: {content: ""},
        element: {content: ""},
        environment: {content: ""}
      },
      takedown:{
        equipment: {content: ""},
        element: {content: ""},
        environment: {content: ""}
      }
    },
    alertMessage: {},
    changed: false
  }

  resetTextboxes = () => {
    this.setState({
      newComments: {
        setup:{
          equipment: {content: ""},
          element: {content: ""},
          environment: {content: ""}
        },
        takedown:{
          equipment: {content: ""},
          element: {content: ""},
          environment: {content: ""}
        }
      }
    });
  }

  handleChange = event =>{
    if (event.target.attributes.type.value === "number"){
      // changing climbs number from takedown
      const {name, value} = event.target;
      const ropeId = parseInt(event.target.getAttribute('rope-id'));

      this.setState(state => {
        const takedownAttributes = state.takedownAttributes;
        const rope = takedownAttributes.ropesAttributes.find(r => r.id === ropeId);

        rope.climbsAttributes[0][name] = parseInt(value);

        return {
          takedownAttributes
        }
      }, () => console.log(this.state))

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
    const data = {
      id: this.state.id,
      date: this.state.date,
      setup_attributes: this.state.setup_attributes,
      takedown_attributes: this.state.takedown_attributes,
      current_user: this.props.currentUser
    }

    for(const insp in this.state.newComments){
      for(const section_title in this.state.newComments[insp]){
        if (data[`${insp}_attributes`]){
          const section = data[`${insp}_attributes`].sections_attributes.find(s => s.title === section_title);

          section.comments_attributes.push({
            id: null,
            content: this.state.newComments[insp][section_title].content,
            user_id: data.current_user.id
          })
        }
      }
    }

    return data;
  }

  handleSubmit = event => {
    event.preventDefault();
    const elemId = this.state.element.id;
    const data = this.gatherDataFromState();

    if (this.state.id){
      const url = `/api/v1/elements/${elemId}/preuse_inspections/${this.state.id}`;
      axios.patch(url,{preuse_inspection: data, user_id: this.props.currentUser.id})
        .then(resp => {
          if(resp.status === 200){
            this.setState(resp.data);
            this.resetTextboxes();
            this.setState({alertMessage: [{type:"success", message:"Inspection successfully updated"}]});
          } else {
            this.handleErrors(resp.errors);
          }
        })
    } else {
      const url = `/api/v1/elements/${elemId}/preuse_inspections/`;
      axios.post(url,{preuse_inspection: data, user_id: this.props.currentUser.id})
        .then(resp => {
          if(resp.status === 200){
            this.setState(resp.data);
            this.resetTextboxes();
            this.setState({alertMessage: [{type:"success", message:"Inspection successfully logged"}]});
            this.props.history.push(`/preuse_inspections/elements/${elemId}/edit`);
          } else {
            this.handleErrors(resp.errors);
          }
        })
    }
  }

  renderAlert = () => {
    const alert = this.state.alertMessage;
    if (Object.keys(alert).length > 0) {
      return (
        <div className={`alert alert-${alert.type}`}>
          <ul>
            <li>{alert.message}</li>
          </ul>
        </div>
      )
    }
  }

  queryCompleted = resp => {
    if (resp.preuseInspection.id !== null){
      this.props.history.push(`/preuse_inspections/elements/${resp.id}/edit`);
      this.setState({alertMessage: {type:"info", message:"Previous inspection loaded", changed: false}});
    } else {
      this.props.history.push(`/preuse_inspections/elements/${resp.id}/new`);
      this.setState({alertMessage: {}, changed: false});
    }
    this.resetTextboxes();
    this.updateStateFromQuery(resp);
  } //TODO put changed state in resetTextboxes

  updateStateFromQuery = data => {
    this.setState({
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
          elemId: this.state.id,
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

              {this.state.setupAttributes && this.state.setupAttributes.isComplete ?
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

export default PreuseForm;