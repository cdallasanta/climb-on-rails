import React, { Component } from 'react';
import '../../stylesheets/sessions.scss';
import { withRouter } from "react-router";
import { History, LocationState } from "history";
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { signInMutation } from '../../queries/queries';

interface Props {
  handleLogin: (remember: boolean, token?: string) => void;
  history: History<LocationState>;
  signInMutation: (variables: {variables: {
      email: string,
      password: string
    }}) => any;
}
//TODO replace the any with a Promise

interface State {
  email: string;
  password: string;
  errors: string[];
  remember: boolean;
}

class Login extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: [],
      remember: false
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value: boolean | string = target.type === 'checkbox' ? target.checked : target.value;
    this.setState((prevState: State) => ({
      ...prevState,
      [target.name]: value
    }));
  }

  handleSignIn = (resp: {signInUser?: {token?: string}}) => {
    if(resp.signInUser === null){
      this.setState({
        email: "",
        password: "",
        remember: false,
        errors: ["No User found with that email and password"]
      });
    } else {
      this.props.handleLogin(this.state.remember, resp.signInUser?.token);
      this.props.history.push('/preuse_inspections');
    }
  }

  handleErrors = () => {
    return (
      <div className="alert alert-danger">
        <ul>
          {this.state.errors.map(error =>{
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.signInMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((resp: any) => this.handleSignIn(resp.data))
  }
// TODO fix the 'any' above
  useDemo = () => {
    this.setState({
      email:"demo@email.com",
      password:"demopass"
    })
  }

  render() {
    const {email, password, remember} = this.state;

    return(
      <div className="content" id="logged-out-content">
        {this.state.errors.length > 0 ? this.handleErrors() : null}

        <div id="login-form-div">
          <h1>Welcome to<br />
          Climb On! - test2</h1>

          <form id="login-form" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="button"
                name="demoInfo"
                onClick={this.useDemo}
                value="Fill in Demo User's info" />
            </div>
            
            <input placeholder="email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange} />

            <input placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange} />

            <div>
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={this.handleChange} />
              <label htmlFor="remember">Remember Me</label>
            </div>

            <button placeholder="submit" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    )
  }
};

export default compose(
  graphql(signInMutation, {name:"signInMutation"}),
  withRouter
)(Login);

