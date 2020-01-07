import React from 'react';
import { siteStatusQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';

const DashboardTable = ({date, setDate, lastUpdated}) => {
  const renderInspectionTable = (elements) => {
    return elements.map((elem, i) => {
      return <div className="table-row" key={i}>
          <div className="td">{elem.name}</div>
          <div className="td"><img src={require(`../images/${elem.setup}.png`)} className="statusIcon" alt={elem.setup} /></div>
          <div className="td"><img src={require(`../images/${elem.takedown}.png`)} className="statusIcon" alt={elem.takedown} /></div>
          <div className="td"><NavLink to={`/admin/elements/${elem.id}`}>View Element</NavLink></div>
        </div>
    })
  }

  const formattedDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
  const { data } = useQuery(siteStatusQuery, {
    variables: {date: formattedDate},
    pollInterval: 60000,
    fetchPolicy: "no-cache"
  })
  
  return <div className="dashboard">
    <DatePicker selected={date} onChange={(date) => setDate(date)} />
    <div className="table">
      <div className="table-head">
        <div className="th">Element</div>
        <div className="th">Setup</div>
        <div className="th">Takedown</div>
        <div className="th"></div>
      </div>
      <div className="table-body">
        {typeof(data) === "undefined" ? null : renderInspectionTable(data.site.status)}
      </div>
    </div>
    <div className="last-updated">Last updated: {lastUpdated}</div>
  </div>
}

export default DashboardTable;