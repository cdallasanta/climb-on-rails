import React, {Component} from 'react';
import "../stylesheets/dashboard.scss";
import "react-datepicker/dist/react-datepicker.css";
import DashboardTable from './dashboardTable';

interface State {
  lastUpdated: string;
  date: Date;
}

class Dashboard extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
        hour: "numeric",
        minute: "numeric"
      }),
      date: new Date()
    }
  }

  setDate = (date: Date) => {
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