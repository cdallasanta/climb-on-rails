import React from 'react';
import './stylesheets/global.scss'
import Dashboard from './components/dashboard'
// import { AUTH_TOKEN } from './constants'

interface State {
  token: string;
  loggedIn: boolean;
}

class App extends Component<{}, State> {
  constructor(props: {}, state: State){
    super(props);
    state = state;
  }

  handleLogin = (remember: boolean = false, token?: string): void => {
    this.setState({
      userToken: token,
      loggedIn: true
    });

    if(remember){
      localStorage.setItem("temp_token", token);
    } // TODO fix constants and temp_token: AUTH_TOKEN
  }

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
