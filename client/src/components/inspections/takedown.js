import React, {Component} from 'react';
import Section from '../../components/inspections/section';

class Takedown extends Component {
  renderSections = () => {
    return <>
      <Section {...this.props}
        instructions={this.props.instructions.elementInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Element")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Element.content}
        inspection="takedown" />
      <Section {...this.props}
        instructions={this.props.instructions.equipmentInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Equipment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Equipment.content}
        inspection="takedown" />
      <Section {...this.props}
        instructions={this.props.instructions.environmentInstructions}
        data={this.props.data.sectionsAttributes.find(s => s.title === "Environment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Environment.content}
        inspection="takedown" />
    </>
  }

  renderClimbs = () => {
    return <div className="climb-blocks form-group">
      <table>
        <thead><tr>
          <th>Rope</th>
          <th>Block 1</th>
          <th>Block 2</th>
          <th>Block 3</th>
          <th>Block 4</th>
        </tr></thead>
        <tbody>
          {this.props.data.climbsAttributes.map((climb, i) =>{
          return <tr key ={i}>
            <td>{climb.rope.identifier}</td>
            <td>
              <input type="number"
              value={climb.block1 ? climb.block1 : ""}
              name="block1"
              climb-id={climb.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block2 ? climb.block2 : ""}
              name="block2"
              climb-id={climb.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block3 ? climb.block3 : ""}
              name="block3"
              climb-id={climb.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block4 ? climb.block4 : ""}
              name="block4"
              climb-id={climb.id}
              onChange={this.props.handleChange} />
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  }

  render(){
    return (
      <div id="takedown-form">
        <h1>Takedown</h1>
        {this.renderClimbs()}

        {this.renderSections()}

        {this.props.renderUpdatedBy()}
      </div>
    )
  }
}

export default Takedown;