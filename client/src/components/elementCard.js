import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const ElementCard = ({data: {name, id}, location}) => {
  return (
    <Link to={location.pathname + `/elements/${id}/new`} style={{textDecoration: 'none'}}>
      <div className="element-card">
        <h1>{name}</h1>
        
        <img src={require(`../images/${name.replace(/[^0-9a-z]/gi, "")}.png`)} alt={`${name}`} />
      </div>
    </Link>
  )
}

export default withRouter(ElementCard);