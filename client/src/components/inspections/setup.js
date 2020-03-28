import React, {Component} from 'react';
import Section from '../../components/inspections/section';

class Setup extends Component {
  renderSections = () => {
    return <>
      <Section {...this.props}
        instructions={this.props.instructions.elementInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Element")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Element.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.instructions.equipmentInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Equipment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Equipment.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.instructions.environmentInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Environment")}
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