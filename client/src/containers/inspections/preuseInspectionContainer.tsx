import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import ElementList from '../elementList';
import PreuseForm from './preuseForm';

class PreuseInspectionContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/preuse_inspections/elements/:element_id/new"
          component={PreuseForm}
        />
        <Route path="/preuse_inspections/elements/:element_id/edit"
          component={PreuseForm}
        />
        <Route path="/preuse_inspections"
          component={ElementList}
        />
      </Switch>
    )
  }
}

export default PreuseInspectionContainer;