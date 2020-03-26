import React, {Component} from 'react';
import "../stylesheets/dashboard.scss";
import "react-datepicker/dist/react-datepicker.css";
import { siteStatusQuery } from '../queries/queries';
import { Query } from 'react-apollo';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';

interface State {
  date: Date;
  lastUpdated: string;
}

interface Element {
  id: number;
  name: string;
  setup: string;
  takedown: string;
}

class Dashboard extends Component<{}, State> {
  state = {
    lastUpdated: new Date(Date.now()).toLocaleTimeString("es-US", {
      hour: "numeric",
      minute: "numeric"
    }),
    date: new Date()
  }

  setDate = (date: Date, refetch: any) => {
    this.setState({
      date: date
    });
    refetch();
  }

  renderInspectionTable = (elements: Element[]) => {
    return elements.map((elem: Element, i: number) => {
      return <div className="table-row" key={i}>
        <div className="td">{elem.name}</div>
        <div className="td"><img src={require(`../images/${elem.setup}.png`)} className="statusIcon" alt={elem.setup} /></div>
        <div className="td"><img src={require(`../images/${elem.takedown}.png`)} className="statusIcon" alt={elem.takedown} /></div>
        <div className="td"><NavLink to={`/admin/elements/${elem.id}`}>View Element</NavLink></div>
      </div>
    })
  }

  render(){
    const formattedDate: string = this.state.date.getDate()  + "/" + (this.state.date.getMonth()+1) + "/" + this.state.date.getFullYear();
    
    return (
      <Query
        query={siteStatusQuery}
        pollInterval={60000}
        variables={{date: formattedDate}}>
        {({loading, data, refetch}: any) => {
          if (loading) return null;
          
          return <div className="dashboard">
            <DatePicker selected={this.state.date} onChange={(date: Date) => this.setDate(date, refetch)} />
            <div className="table">
              <div className="table-head">
                <div className="th">Element</div>
                <div className="th">Setup</div>
                <div className="th">Takedown</div>
                <div className="th"></div>
              </div>
              <div className="table-body">
                {typeof(data) === "undefined" ? null : this.renderInspectionTable(data.site.status)}
              </div>
            </div>
            <div className="last-updated">Last updated: {typeof(data) === "undefined" ? null : data.site.time.trim()}</div>
          </div>
          }
        }
      </Query>
    )
  }
}

export default Dashboard;