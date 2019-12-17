import React, {Component} from 'react';
import {connect} from 'react-redux';
import "../stylesheets/elements.scss";
import ElementCard from '../components/elementCard';

class ElementList extends Component {

  renderElements= () => {
    return this.props.elements.map(elem => {
      return <ElementCard data={elem} key={elem.id} location={this.props.location} />;
    });
  }

  render() {
    return (
      <div className="elements" id="elements-list">
        {this.renderElements()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    elements: state.site.elements
  }
}

export default connect(mapStateToProps)(ElementList);