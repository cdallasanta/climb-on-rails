import React from 'react';
import "../stylesheets/header.scss";
import { NavLink, withRouter } from 'react-router-dom';

const Header = ({handleLogout}) => {
  return(
    <header className="header">
      <NavLink to="/preuse_inspections" className="nav-link" activeClassName="selected">Preuse Inspections</NavLink>
      <NavLink to="/periodic_inspections" className="nav-link" activeClassName="selected">Periodic Inspections</NavLink>
      <NavLink to="/elements" className="nav-link" activeClassName="selected">My Profile (broken)</NavLink>
      <NavLink to="/logout" className="nav-link" activeClassName="selected"
        onClick={handleLogout} >Logout</NavLink>
      
      <img src={require(`../images/logo.png`)} alt="logo" />
    </header>
  );
};

export default withRouter(Header);