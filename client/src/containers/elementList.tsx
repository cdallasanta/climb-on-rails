import React, {Component} from 'react';
import "../stylesheets/elements.scss";
import ElementCard from '../components/elementCard';
import { Query } from 'react-apollo';
import { getElementsQuery } from '../queries/queries';
import { RouteComponentProps } from 'react-router';

interface Element {
  name: string,
  id: number
}

interface Response {
  loading: boolean;
  data: {elements: Element[]}
}

class ElementList extends Component<RouteComponentProps> {
  renderElements= (data: {elements: Element[]}) => {
    return data.elements.map(elem => {
      return <ElementCard data={elem} key={elem.id} />;
    });
  }

  render() {
    return (
      <Query
        query={getElementsQuery}>
        {({loading, data}: Response) => {
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