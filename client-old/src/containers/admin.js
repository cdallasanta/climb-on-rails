import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard';


class AdminContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/dashboard"
          component={Dashboard}
        />
        <Route path="/admin/elements"
          component={Dashboard}
        />
        <Route path="/admin/users"
          component={Dashboard}
        />
      </Switch>
    )
  }
}

export default AdminContainer;