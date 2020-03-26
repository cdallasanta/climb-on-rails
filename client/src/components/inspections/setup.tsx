import React, {Component} from 'react';
import Section from './section';

interface Props{
  instructions: any,
  data: any,
  handleChange: (e: any) => void,
  newComments: {
    Element: {content: string},
    Equipment: {content: string},
    Environment: {content: string}
  },
  renderUpdatedBy: (users: User[]) => React.ReactNode
} // TODO: fix the typing of handleChange

interface User {
  fullname: string
}

class Setup extends Component<Props> {
  renderSections = () => {
    return <>
      <Section {...this.props}
        instructions={this.props.instructions.elementInstructions}
        data={this.props.data.sectionsAttributes.find((s: {title: string}) => s.title === "Element")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Element.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.instructions.equipmentInstructions}
        data={this.props.data.sectionsAttributes.find((s: {title: string}) => s.title === "Equipment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Equipment.content}
        inspection="setup" />
      <Section {...this.props}
        instructions={this.props.instructions.environmentInstructions}
        data={this.props.data.sectionsAttributes.find((s: {title: string}) => s.title === "Environment")}
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

        {this.props.renderUpdatedBy(this.props.data.users)}
      </div>
    )
  }
}

export default Setup;