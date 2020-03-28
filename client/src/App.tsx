import React, {Component} from 'react';
import './stylesheets/global.scss'
import Home from './containers/home';
import Login from './containers/sessions/login'
import { History, LocationState } from "history";
import { AUTH_TOKEN } from './constants'

interface Props {
  history?: History<LocationState>;
}

interface State {
  userToken?: string;
  loggedIn: boolean;
}

class App extends Component<Props, State> {
  state = {
    loggedIn: false
  }

  handleLogin = (remember: boolean = false, token: string = ""): void => {
    this.setState({
      userToken: token,
      loggedIn: true
    });

    if(remember){
      localStorage.setItem(AUTH_TOKEN, token);
    }
  }

  
  loginStatus = (): void => {
    // if a user is stored in cookies, load it to state and set logged in to true
    if (localStorage.getItem(AUTH_TOKEN) !== null){
      this.handleLogin(true, localStorage.getItem(AUTH_TOKEN) || "");
    } else {
    // otherwise, ensure that the store is cleared of user data
      this.handleLogout();
    }
  }
  
  handleLogout = (): void => {
    this.setState({
      userToken: "",
      loggedIn: false
    });
    // TODO: send mutation to server to sign out
    localStorage.removeItem(AUTH_TOKEN);
    this.props.history?.push('/');
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

export default App;
