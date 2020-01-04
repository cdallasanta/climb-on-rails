import React, {Component} from 'react';
import '../../stylesheets/sessions.scss';
import { withRouter } from "react-router";
import axios from 'axios';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {signInMutation} from '../../queries/queries';

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

  handleSubmit = event => {
    event.preventDefault();
    
    const {email, password, remember} = this.state;
    let user = {
      email: email,
      password: password
    }


    axios.post('/login', {user}, {withCredentials: true})
      .then(resp => {
        if (resp.data.status === 401){
          this.setState({
            email: "",
            password: "",
            remember: false,
            errors: resp.data.errors
          });
        } else {
          this.props.handleLogin(resp.data, remember);
          this.props.history.push('/preuse_inspections');
        }
      }) //TODO figure out what I want to so with server errors
      .catch(error => console.log('api error:', error));
      
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

          <form onSubmit={this.handleSubmit} id="login-form">
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

