import React, {Component} from 'react';
import "./stylesheets/global.scss";
import { withRouter } from 'react-router-dom';
import Home from './containers/home';
import Login from './containers/sessions/login';
import { AUTH_TOKEN } from './constants'

class App extends Component {
  state = {
    token: "",
    loggedIn: false
  };

  handleLogin = (token, remember = false) => {
    this.setState({
      userToken: token,
      loggedIn: true
    });

    if(remember){
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }

  handleLogout = () => {
    this.setState({
      userToken: "",
      loggedIn: false
    });
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history.push('/');
  }

  loginStatus = () => {
    // if a user is stored in cookies, load it to state and set logged in to true
    if (localStorage.getItem(AUTH_TOKEN) !== null){
      this.handleLogin(localStorage.getItem(AUTH_TOKEN));
    } else {
    // otherwise, ensure that the store is cleared of user data
      this.handleLogout();
    }
  }

  componentDidMount() {
    this.loginStatus();
  }

  render() {
    if (this.state.loggedIn) {
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

export default withRouter(App);