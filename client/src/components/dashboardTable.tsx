import React from 'react';
import { siteStatusQuery } from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import DatePicker from 'react-datepicker';
import { NavLink } from 'react-router-dom';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  lastUpdated: String;
}

interface Element {
  id: number;
  name: string;
  setup: string;
  takedown: string;
}

const DashboardTable = ({date, setDate, lastUpdated}: Props) => {
  const renderInspectionTable = (elements: Element[]) => {
    return elements.map((elem: Element, i: number) => {
      return <div className="table-row" key={i}>
          <div className="td">{elem.name}</div>
          <div className="td"><img src={require(`../images/${elem.setup}.png`)} className="statusIcon" alt={elem.setup} /></div>
          <div className="td"><img src={require(`../images/${elem.takedown}.png`)} className="statusIcon" alt={elem.takedown} /></div>
          <div className="td"><NavLink to={`/admin/elements/${elem.id}`}>View Element</NavLink></div>
        </div>
    })
  }

  const formattedDate: string = date.getDate()  + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
  // TODO: come back to this typing
  const { data } = useQuery(siteStatusQuery, {
    variables: {date: formattedDate},
    pollInterval: 60000,
    fetchPolicy: "no-cache"
  });
  
  return <div className="dashboard">
    <DatePicker selected={date} onChange={(date: Date) => setDate(date)} />
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