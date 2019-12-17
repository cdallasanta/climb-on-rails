import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import "../stylesheets/table.scss";

class Dashboard extends Component {
  state = {
    elements: [],
    lastUpdated: Date.now(),
    date: new Date()
  }

  componentDidMount() {
    this.updateState();
    setInterval(this.updateState, 60000);
  }

  componentWillUnmount(){
    clearInterval();
  }

  updateState = () => {
    axios.get(`/api/v1/sites/${this.props.currentUser.site_id}/status/${this.state.date}`)
    .then(response => this.setState({
      elements: response.data,
      lastUpdated: Date.now()
    }))
    .catch(error => console.log(error))
  }

  handleChange = event => {
    this.setState({date: event.target.value}, () =>{
      this.updateState();
    });
  }

  renderInspectionTable = () => {
    if (Object.keys(this.state.elements).length > 0){
      return Object.keys(this.state.elements).map((element, i) => {
        const elem = this.state.elements[element]
        return <div className="table-row" key={i}>
          <div className="td">{element}</div>
          <div className="td">{elem.setup}</div>
          <div className="td">{elem.takedown}</div>
          <div className="td"><NavLink to={`/admin/elements/${elem.id}`}>View Element</NavLink></div>
        </div>
      })
    }
  }

  render() {
    return (
      <div className="dashboard">
        <input type="date" value={this.state.date} onChange={this.handleChange} />
        <div className="table">
          <div className="table-head">
            <div className="th">Element</div>
            <div className="th">Setup</div>
            <div className="th">Takedown</div>
            <div className="th"></div>
          </div>
          <div className="table-body">
            {this.renderInspectionTable()}
          </div>
        </div>
        Last updated: {new Date(this.state.lastUpdated).toLocaleTimeString("es-US", {
          hour: "numeric",
          minute: "numeric"
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(Dashboard);