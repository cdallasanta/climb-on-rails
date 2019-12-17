import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../stylesheets/periodic_inspections.scss';
import axios from 'axios';
import Section from '../../components/inspections/section';

class PeriodicForm extends Component {
  state = {
    date: new Date(),
    element: {},
    id: null,
    users: [],
    alert_message: [],
    newComments: {
      Equipment: {content: ""},
      Element: {content: ""},
      Environment: {content: ""}
    }
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

  handleChange = event =>{
    if (event.target.attributes.type.value === "textarea") {
      // changing comment
      const {name, value} = event.target;

      this.setState(state => {
        const newComments = state.newComments;
        newComments[name].content = value;
        return Object.assign({}, state, {newComments: newComments})
      });
    } else if (event.target.attributes.type.value === "checkbox") {
      //chaning checkbox
      const {name, checked} = event.target;
  
      this.setState(state => {
        return state.sections_attributes.find(s => s.title === name).complete = checked;
      });
    }

    document.getElementById('submit-button').disabled = false;
    document.getElementById('submit-button').value = "Submit";
  }

  checkDateForInspection = date => {
    const elemId = this.props.match.params.element_id;
    axios.get(`/api/v1/elements/${elemId}/periodic_inspections/date/${date}`)
    .then(resp =>{
      if (resp.data.id !== null){
        this.props.history.push(`/periodic_inspections/elements/${elemId}/edit`);
        this.setState({alert_message: [{type:"info", message:"Previous inspection loaded"}]});
      } else {
        this.props.history.push(`/periodic_inspections/elements/${elemId}/new`);
        this.setState({alert_message: []});
      }
      this.setState(resp.data);
      this.resetTextboxes();
    })
  }

  componentDidMount(){
    this.checkDateForInspection(this.state.date);
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

  // TODO figure out how I want to handle server errors
  handleErrors = errors => {
    console.log(errors);
  }

  gatherDataFromState = () => {
    const data = {
      id: this.state.id,
      date: this.state.date,
      sections_attributes: this.state.sections_attributes,
      current_user: this.props.currentUser
    }

    data.sections_attributes.forEach(section =>{
      const matchedComment = this.state.newComments[section.title];
      section.comments_attributes.push({
        id: null,
        content: matchedComment.content,
        user_id: data.current_user.id
      })
    });

    return data;
  }

  handleSubmit = event => {
    event.preventDefault();
    const elemId = this.state.element.id;
    const data = this.gatherDataFromState();

    if (this.state.id){
      const url = `/api/v1/elements/${elemId}/periodic_inspections/${this.state.id}`;
      axios.patch(url,{periodic_inspection: data, user_id: this.props.currentUser.id})
        .then(resp => {
          if(resp.status === 200){
            this.setState(resp.data);
            this.resetTextboxes();
            this.setState({alert_message: [{type:"success", message:"Inspection successfully updated"}]});
          } else {
            this.handleErrors(resp.errors);
          }
        })
    } else {
      const url = `/api/v1/elements/${elemId}/periodic_inspections/`;
      axios.post(url,{periodic_inspection: data, user_id: this.props.currentUser.id})
        .then(resp => {
          if(resp.status === 200){
            this.setState(resp.data);
            this.resetTextboxes();
            this.setState({alert_message: [{type:"success", message:"Inspection successfully logged"}]});
            this.props.history.push(`/periodic_inspections/elements/${elemId}/edit`);
          } else {
            this.handleErrors(resp.errors);
          }
        })
    }
  }

  renderAlert = () => {
    if (this.state.alert_message.length > 0) {
      const alert = this.state.alert_message[0];
      return (
        <div className={`alert alert-${alert.type}`}>
          <ul>
            <li>{alert.message}</li>
          </ul>
        </div>
      )
    }
  }

  renderSections = () => {
    if (this.state.sections_attributes.length > 0) {
      return <>
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.element_instructions}
          data={this.state.sections_attributes.find(s => s.title === "Element")}
          newComment={this.state.newComments.Element.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.equipment_instructions}
          data={this.state.sections_attributes.find(s => s.title === "Equipment")}
          newComment={this.state.newComments.Equipment.content} />
        <Section
          handleChange={this.handleChange}
          instructions={this.state.element.environment_instructions}
          data={this.state.sections_attributes.find(s => s.title === "Environment")}
          newComment={this.state.newComments.Environment.content} />
      </>
    }
  }

  render() {
    return (
      <>
        {this.renderAlert()}

        <div id="periodic-inspection-form">
          <form onSubmit={this.handleSubmit.bind(this)} >
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" className="form-control-sm" value={this.state.date} onChange={event => this.checkDateForInspection(event.target.value)} required />
            </div>

            {this.state.sections_attributes ?
              this.renderSections() : null }

            <input type="submit" id="submit-button" />

            {this.renderUpdatedBy()}
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PeriodicForm);