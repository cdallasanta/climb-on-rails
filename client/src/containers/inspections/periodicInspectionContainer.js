import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import ElementList from '../elementList';
import PeriodicForm from './periodicForm';

class PeriodicInspectionContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/periodic_inspections/elements/:element_id/new"
          component={PeriodicForm}
        />
        <Route path="/periodic_inspections/elements/:element_id/edit"
          component={PeriodicForm}
        />
        <Route path="/periodic_inspections"
          component={ElementList} title="Periodic Inspections"
        />
      </Switch>
    )
  }
}

export default PeriodicInspectionContainer;