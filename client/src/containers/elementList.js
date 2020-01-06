import React, {Component} from 'react';
import "../stylesheets/elements.scss";
import ElementCard from '../components/elementCard';
import {graphql} from 'react-apollo';
import {getElementsQuery} from '../queries/queries';
import * as compose from 'lodash.flowright';

class ElementList extends Component {

  renderElements= () => {
    const data = this.props.getElementsQuery
    if (!data.loading){
      return data.elements.map(elem => {
        return <ElementCard data={elem} key={elem.id} location={this.props.location} />;
      });
    }
  }

  render() {
    return (
      <div className="elements" id="elements-list">
        {this.renderElements()}
      </div>
    )
  }
}

export default compose(
  graphql(getElementsQuery, {name:"getElementsQuery"})
)(ElementList);