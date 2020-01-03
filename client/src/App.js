import React, {Component} from 'react';
import { connect } from 'react-redux';
import "./stylesheets/global.scss";
import { withRouter } from 'react-router-dom';
import Home from './containers/home';
import Login from './containers/sessions/login';

class App extends Component {
  handleLogin = (data, remember = false) => {
    this.props.login(data);

    if(remember){
      localStorage.setItem("currentUser", JSON.stringify(data));
    }
  }

  handleLogout = () => {
    this.props.logout();
    localStorage.removeItem("currentUser");
    this.props.history.push('/');
  }

  loginStatus = () => {
    // if a user is stored in cookies, load it to state and set logged in to true
    if (localStorage.getItem("currentUser") !== null){
      this.props.login(JSON.parse(localStorage.getItem("currentUser")));
    } else {
    // otherwise, ensure that the store is cleared of user data
      this.handleLogout();
    }
  }

  componentDidMount() {
    this.loginStatus();
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Home handleLogout={this.handleLogout} />
      );
    } else {
      return (
        <Login handleLogin={this.handleLogin} />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch({type:"LOGIN", payload:user}),
    logout: () => dispatch({type:"LOGOUT"})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));