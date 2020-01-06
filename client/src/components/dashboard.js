import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import "../stylesheets/table.scss";
import "../stylesheets/dashboard.scss";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { graphql } from 'react-apollo';
import { siteStatusQuery } from '../queries/queries';
import {flowRight as compose} from 'lodash';

class Dashboard extends Component {
  state = {
    elements: [],
    lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
      hour: "numeric",
      minute: "numeric"
    }),
    date: new Date()
  }

  componentDidMount() {
    setInterval(this.updateState, 60000);
  }

  componentWillUnmount(){
    clearInterval();
  }

  updateState = () => {
    debugger;
    this.setState({lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
      hour: "numeric",
      minute: "numeric"
    })})
  }

  setDate = date => {
    this.setState({date: date}, () =>{
      this.updateState();
    });
  }

  renderInspectionTable = () => {
    const data = this.props.siteStatusQuery;
    if (!data.loading){
      const elements = data.site.status
      return elements.map((elem, i) => {
        return <div className="table-row" key={i}>
          <div className="td">{elem.name}</div>
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
        Last updated: {this.state.lastUpdated}
      </div>
    )
  }
}

export default compose(
  graphql(siteStatusQuery, {
    options: (props) => ({ variables: { date: new Date()} }),
    name: "siteStatusQuery" 
  }))(Dashboard);