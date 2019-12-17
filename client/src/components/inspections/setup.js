import React, {Component} from 'react';
import Section from '../../components/inspections/section';

class Setup extends Component {
  renderSections = () => {
    return <>
      <Section {...this.props}
        instructions={this.props.element.element_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Element")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Element.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.element.equipment_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Equipment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Equipment.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.element.environment_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Environment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Environment.content}
        inspection="setup" />
    </>
  }

  render(){
    return (
      <div id="setup-form">
        <h1>Setup</h1>
        {this.renderSections()}

        {this.props.renderUpdatedBy()}
      </div>
    )
  }
}

export default Setup;