import React from 'react';
import "../stylesheets/header.scss";
import {NavLink} from 'react-router-dom';

const Header = () => {
  return(
    <header className="header">
      <NavLink to="/preuse_inspections" className="nav-link" activeClassName="selected">Preuse Inspections</NavLink>
      <NavLink to="/elements" className="nav-link" activeClassName="selected">My Profile (broken)</NavLink>
      <NavLink to="/elements" className="nav-link" activeClassName="selected">Logout (broken)</NavLink>
      
      <img src={require(`../images/logo.png`)} alt="logo" />
    </header>
  );
};

export default Header;