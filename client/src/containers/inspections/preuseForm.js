import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../stylesheets/preuse_inspections.scss';
import '../../stylesheets/inspection_forms.scss';
import axios from 'axios';
import Setup from '../../components/inspections/setup';
import Takedown from '../../components/inspections/takedown';

class PreuseForm extends Component {
  state = {
    date: new Date(),
    element: {},
    id: null,
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
    alert_message: []
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
      const ropeId = parseInt(event.target.getAttribute('rope-id'));

      this.setState(state => {
        const takedown_attributes = state.takedown_attributes;
        const rope = takedown_attributes.ropes_attributes.find(r => r.id === ropeId);

        rope.climbs_attributes[0][name] = parseInt(value);

        return {
          takedown_attributes
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
        const newAttrs = state[`${inspection}_attributes`];
        newAttrs.sections_attributes.find(s => s.title === name).complete = checked;
        return Object.assign({}, state, {[`${inspection}_attributes`]: newAttrs})
      });
    }

    document.getElementById('submit-button').disabled = false;
    document.getElementById('submit-button').value = "Submit";
  }

  checkDateForInspection = date => {
    const elemId = this.props.match.params.element_id;
    axios.get(`/api/v1/elements/${elemId}/preuse_inspections/date/${date}`)
    .then(resp =>{
      if (resp.data.id !== null){
        this.props.history.push(`/preuse_inspections/elements/${elemId}/edit`);
        this.setState({alert_message: [{type:"info", message:"Previous inspection loaded"}]});
      } else {
        this.props.history.push(`/preuse_inspections/elements/${elemId}/new`);
        this.setState({alert_message: []});
      }
      this.setState(resp.data);
      this.resetTextboxes();
    })
    
    document.getElementById('submit-button').value = "No Changes Yet";
    document.getElementById('submit-button').disabled = true;
  }

  componentDidMount(){
    this.checkDateForInspection(this.state.date);
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

  // // TODO figure out how I want to handle server errors
  // handleErrors = errors => {
  //   console.log(errors);
  // }

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
            this.setState({alert_message: [{type:"success", message:"Inspection successfully updated"}]});
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
            this.setState({alert_message: [{type:"success", message:"Inspection successfully logged"}]});
            this.props.history.push(`/preuse_inspections/elements/${elemId}/edit`);
          } else {
            this.handleErrors(resp.errors);
          }
        })
    }
    
    document.getElementById('submit-button').value = "No Changes Yet";
    document.getElementById('submit-button').disabled = true;
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

  render() {
    return (
      <>
        {this.renderAlert()}

        <div id="preuse-inspection-form">
          <form onSubmit={this.handleSubmit.bind(this)} >
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" className="form-control-sm" value={this.state.date} onChange={event => this.checkDateForInspection(event.target.value)} required />
            </div>

            {this.state.setup_attributes ?
              <Setup data={this.state.setup_attributes}
                renderUpdatedBy={this.renderUpdatedBy}
                handleChange={this.handleChange}
                element={this.state.element}
                newComments={this.state.newComments.setup}
              /> : null}

            {this.state.takedown_attributes ?
              <><hr /><Takedown data={this.state.takedown_attributes}
                renderUpdatedBy={this.renderUpdatedBy}
                handleChange={this.handleChange}
                element={this.state.element}
                newComments={this.state.newComments.takedown}
              /></> : null}

            <input type="submit" id="submit-button" />

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

export default connect(mapStateToProps)(PreuseForm);