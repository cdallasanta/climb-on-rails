import React, { Component } from 'react';
import "../stylesheets/global.scss";
import { Switch, Route,withRouter, RouteComponentProps } from 'react-router-dom';
import AdminContainer from './admin';
import PreuseInspectionContainer from './inspections/preuseInspectionContainer';
import PeriodicInspectionContainer from './inspections/periodicInspectionContainer';
import Header from '../components/header';
import * as images from '../images/index';
import Dashboard from '../components/dashboard';

interface Props extends RouteComponentProps {
  handleLogout: () => void;
}

class Home extends Component<Props> {
  state = {
    backgroundImage: ""
  }

  componentDidUpdate(prevProps: Props){
    if (prevProps.location !== this.props.location){
      this.assignBackgroundImage(this.props.location.pathname);
    }
  }

  assignBackgroundImage(pathname: string){
    switch (true){
      case pathname.includes("periodic_inspections") &&
          (pathname.endsWith('/new') || pathname.endsWith('/edit')):
        this.setState({backgroundImage: `url(${images.periodicForm})`});
        break;
      case pathname.includes("preuse_inspections") &&
          (pathname.endsWith('/new') || pathname.endsWith('/edit')):
          this.setState({backgroundImage: `url(${images.preuseForm})`});
          break;
      case pathname.includes("user"):
          this.setState({backgroundImage: `url(${images.userPage})`});
          break;
      default:
        this.setState({backgroundImage: ""})
        break;
    }
  }

  render(){
    return (
      <div className="content" id="logged-in-content" style={{backgroundImage:this.state.backgroundImage}}>
        <Header handleLogout={this.props.handleLogout} />

        <div id="body">
          <Switch>
            <Route path="/preuse_inspections"
              component={PreuseInspectionContainer}
            />
            <Route path="/periodic_inspections"
              component={PeriodicInspectionContainer}
            />
            <Route path="/admin"
              component={AdminContainer}
            />
          </Switch>
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
