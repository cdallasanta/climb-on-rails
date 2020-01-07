import React, {Component} from 'react';
import "../stylesheets/dashboard.scss";
import "react-datepicker/dist/react-datepicker.css";
import DashboardTable from './dashboardTable';

class Dashboard extends Component {
  state = {
    lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
      hour: "numeric",
      minute: "numeric"
    }),
    date: new Date()
  }

  setDate = (date) => {
    this.setState({
      date: date,
      lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
        hour: "numeric",
        minute: "numeric"})
    });
  }

  render(){
    return(
      <DashboardTable date={this.state.date} setDate={this.setDate} lastUpdated={this.state.lastUpdated}/>
    )
  }
}

export default Dashboard;