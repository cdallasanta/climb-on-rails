import React, { Component } from 'react';
import '../../stylesheets/sessions.scss';
import { withRouter } from "react-router";
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { signInMutation } from '../../queries/queries';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
      remember: false
    };
  }

  handleChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  }

  handleSignIn = resp => {
    if(resp.signInUser === null){
      this.setState({
        email: "",
        password: "",
        remember: false,
        errors: ["No User found with that email and password"]
      });
    } else {
      this.props.handleLogin(resp.signInUser.token, this.state.remember);
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.signInMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(resp => this.handleSignIn(resp.data))
  }

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
        {this.state.errors ? this.handleErrors() : null}

        <div id="login-form-div">
          <h1>Welcome to<br />
          Climb On! - tests</h1>

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

