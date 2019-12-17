import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import "../stylesheets/table.scss";
import "../stylesheets/dashboard.scss";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import {icons} from '../images/index';

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

  setDate = date => {
    this.setState({date: date}, () =>{
      this.updateState();
    });
  }

  // setImgURL = status => {
  //   const iconUrls = icons
  //   return iconUrls[status]
  // }

  renderInspectionTable = () => {
    if (Object.keys(this.state.elements).length > 0){
      return Object.keys(this.state.elements).map((element, i) => {
        const elem = this.state.elements[element]
        return <div className="table-row" key={i}>
          <div className="td">{element}</div>
          <div className="td"><img src={require(`../images/${elem.setup}.png`)} className="statusIcon" alt={elem.setup} /></div>
          <div className="td"><img src={require(`../images/${elem.takedown}.png`)} className="statusIcon" alt={elem.takedown} /></div>
          <div className="td"><NavLink to={`/admin/elements/${elem.id}`}>View Element</NavLink></div>
        </div>
      })
    }
  }

  render() {
    return (
      <div className="dashboard">
        <DatePicker selected={this.state.date} onChange={this.setDate} />
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