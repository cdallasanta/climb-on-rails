import React, {Component} from 'react';
import { connect } from 'react-redux';
import "../stylesheets/elements.scss";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        Dashboard
        {this.props.currentUser.id}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);