import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "../stylesheets/header.scss";
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  handleLogout: () => void;
}

class Header extends React.Component<Props> {
  state = {
    showAdminTools: false
  }

  handleHover = (): void => {
    this.setState({showAdminTools: true});
  }

  handleLeave = (): void => {
    this.setState({showAdminTools: false});
  }

  adminTools = () => {
    if (this.state.showAdminTools){
      return (
        <div>

        </div>
      )
    }
    else
      return null
  }

  render(){
    return(
      <header className="header">
        <div onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>
          <NavLink to="/admin" className="nav-link" activeClassName="selected">Admin</NavLink>
          <div className="submenu-container">
            <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              {this.state.showAdminTools && <Submenu />}
            </ReactCSSTransitionGroup>
          </div>
        </div>
        <div>
          <NavLink to="/preuse_inspections" className="nav-link" activeClassName="selected">Preuse Inspections</NavLink>
        </div>
        <div>
          <NavLink to="/periodic_inspections" className="nav-link" activeClassName="selected">Periodic Inspections</NavLink>
        </div>
        <div>
          <NavLink to="/elements" className="nav-link" activeClassName="selected">My Profile (in development)</NavLink>
        </div>
        <div>
          <NavLink to="/" className="nav-link" activeClassName="selected"
          onClick={this.props.handleLogout} >Logout</NavLink>
        </div>
        
        <img src={require(`../images/logo.png`)} alt="logo" />
      </header>
    )
  }
};

class Submenu extends React.Component {
  render() {
    return (
      <div className="sub-links">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/elements">Elements (in development)</NavLink>
        <NavLink to="/admin/users">Users (in development)</NavLink>
      </div>
    )
  }
}

export default withRouter(Header);