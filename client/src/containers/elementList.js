import React, {Component} from 'react';
import "../stylesheets/elements.scss";
import ElementCard from '../components/elementCard';
import {graphql, Query} from 'react-apollo';
import {getElementsQuery} from '../queries/queries';
import * as compose from 'lodash.flowright';

class ElementList extends Component {
  renderElements= (data) => {
    return data.elements.map(elem => {
      return <ElementCard data={elem} key={elem.id} location={this.props.location} />;
    });
  }

  render() {
    return (
      <Query
        query={getElementsQuery}>
        {({loading, data}) => {
          if (loading) return null;
          
          return <div className="elements" id="elements-list">
            {this.renderElements(data)}
          </div>

        }}
      </Query>
    )
  }
}

export default ElementList;