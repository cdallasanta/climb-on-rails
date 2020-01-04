import React, {Component} from 'react';
import '../../stylesheets/sessions.scss';
import { withRouter } from "react-router";
import {graphql, Mutation} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {signInMutation} from '../../queries/queries';
import { AUTH_TOKEN } from '../../constants'

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

  handleSubmit = event => {

    // this.props.signInMutation({
    //   variables: {email:email, password:password}
    // });
/*
    axios.post('/login', {user}, {withCredentials: true})
      .then(resp => {
        if (resp.data.status === 401){
          
        } else {
        }
      }) //TODO figure out what I want to so with server errors
      .catch(error => console.log('api error:', error));
      */
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

  render() {
    const {email, password, remember} = this.state;

    return(
      <div className="content" id="logged-out-content">
        {this.state.errors ? this.handleErrors() : null}

        <div id="login-form-div">
          <h1>Welcome to<br />
          Climb On!</h1>

          <form id="login-form">
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

            <Mutation
              mutation={signInMutation}
              variables={{ email, password }}
              onCompleted={data => this.handleSignIn(data)}
            >
              {mutation => (
                <div placeholder="submit" type="submit" onClick={mutation}>
                  Log In
                </div>
              )}
            </Mutation>
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

