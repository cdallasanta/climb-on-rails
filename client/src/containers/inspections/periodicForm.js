import React, {Component} from 'react';
import '../../stylesheets/periodic_inspections.scss';
import '../../stylesheets/inspection_forms.scss';
import Section from '../../components/inspections/section';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Query, graphql, useMutation } from 'react-apollo';
import { getPeriodicInspectionQuery, savePeriodicMutation } from '../../queries/inspections';

class PeriodicForm extends Component {
  state = {
    date: new Date(),
    element: {},
    elementId: parseInt(this.props.match.params.element_id),
    users: [],
    alertMessage: {},
    newComments: {
      Equipment: {content: ""},
      Element: {content: ""},
      Environment: {content: ""}
    },
    changed: false
  }

  resetTextboxes = () => {
    this.setState({
      newComments: {
        Equipment: {content: ""},
        Element: {content: ""},
        Environment: {content: ""}
      }
    });
  }

  handleChange = event => {
    if (event.target.attributes.type.value === "textarea") {
      // changing comment
      const {name, value} = event.target;

      this.setState(state => {
        const newComments = state.newComments;
        newComments[name].content = value;
        return Object.assign({}, state, {newComments: newComments})
      });
    } else if (event.target.attributes.type.value === "checkbox") {
      //changing checkbox
      const {name, checked} = event.target;
  
      this.setState(state => {
        return state.sectionsAttributes.find(s => s.title === name).complete = checked;
      });
    }
    this.setState({changed: true, alertMessage: {}});
  }

  handleDateChange = date => {
    this.setState({date: date})
  }

  renderUpdatedBy = () => {
    if (this.state.users.length > 0) {
      return (
        <div className="updated-by form-group">
          <h3>Updated by:</h3>
          {this.state.users.map((user, i) => {
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
    const data = {
      id: this.state.id,
      elementId: this.state.elementId,
      date: formattedDate,
      sectionsAttributes: JSON.parse(JSON.stringify(this.state.sectionsAttributes))
    } // used JSON to deeply copy the state array - lodash is an alternative if I want to import it

    data.sectionsAttributes.forEach(section => {
      // remove user key, since graphql doesn't accept it
      section.commentsAttributes.forEach(comment => {
        delete comment.user;
      })

      // add in new comments
      const matchedComment = this.state.newComments[section.title];
      section.commentsAttributes.push({
        id: null,
        content: matchedComment.content
      })
    });

    return data;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.gatherDataFromState();

    this.props.savePeriodicMutation({
      variables: {data: data}
    }).then(({data: {savePeriodic: {status, errors, periodicInspection}}}) => {
      if (status === "200"){
        this.props.history.push(`/periodic_inspections/elements/${this.state.elementId}/edit`);
        this.setState({
          id: periodicInspection.id,
          users: periodicInspection.users,
          sectionsAttributes: periodicInspection.sectionsAttributes,
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

  renderSections = () => {
    if (this.state.sectionsAttributes.length > 0) {
      return <>
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.elementInstructions}
          data={this.state.sectionsAttributes.find(s => s.title === "Element")}
          newComment={this.state.newComments.Element.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.equipmentInstructions}
          data={this.state.sectionsAttributes.find(s => s.title === "Equipment")}
          newComment={this.state.newComments.Equipment.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.environmentInstructions}
          data={this.state.sectionsAttributes.find(s => s.title === "Environment")}
          newComment={this.state.newComments.Environment.content} />
      </>
    }
  }

  queryCompleted = resp => {
    if (resp.periodicInspection.id !== null){
      this.props.history.push(`/periodic_inspections/elements/${resp.id}/edit`);
      this.setState({
        alertMessage: {type:"info", message:["Previous inspection loaded"]},
        changed: false
      });
    } else {
      this.props.history.push(`/periodic_inspections/elements/${resp.id}/new`);
      this.setState({
        id: resp.periodicInspection.id,
        alertMessage: {},
        changed: false
      });
    }
    this.resetTextboxes();
    this.updateStateFromQuery(resp);
  }

  updateStateFromQuery = (data) => {
    this.setState({
      id: data.periodicInspection.id,
      users: data.periodicInspection.users,
      sectionsAttributes: data.periodicInspection.sectionsAttributes,
      element: {
        equipmentInstructions: data.periodicEquipmentInstructions,
        elementInstructions: data.periodicElementInstructions,
        environmentInstructions: data.periodicEnvironmentInstructions,
      }
    });
  }

  render() {
    return (
      <Query
        query={getPeriodicInspectionQuery}
        variables={{
          elementId: this.state.elementId,
          date: this.state.date.getDate() + "/" + (this.state.date.getMonth()+1) + "/" + this.state.date.getFullYear()
        }}
        fetchPolicy="network-only"
        onCompleted={(data)=> this.queryCompleted(data.element)}
        onError={(error) => console.log(error)}>

        {({loading, refetch}) => {
          if (loading) return null;
          return <>
            {this.renderAlert()}

            <div id="periodic-inspection-form">
            <form onSubmit={(e) => this.handleSubmit(e, refetch)} >
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <DatePicker selected={this.state.date} name="date" className="form-control-sm" onChange={this.handleDateChange} />
              </div>

              {this.state.sectionsAttributes ?
                this.renderSections() : null }

              <input type="submit" id="submit-button" value={this.state.changed ? "Submit": "No changes yet"} disabled={!this.state.changed}/>

              {this.renderUpdatedBy()}
            </form>
            </div>
          </>
        }}
      </Query>
    )
  }
}

export default graphql(savePeriodicMutation, {
  name: "savePeriodicMutation"
})(PeriodicForm);