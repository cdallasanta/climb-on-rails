import React, {Component} from 'react';
import Section from '../../components/inspections/section';

class Takedown extends Component {
  renderSections = () => {
    return <>
      <Section {...this.props}
        instructions={this.props.element.element_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Element")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Element.content}
        inspection="takedown" />
      <Section {...this.props}
        instructions={this.props.element.equipment_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Equipment")}
        handleChange={this.props.handleChange}
        newComment={this.props.newComments.Equipment.content}
        inspection="takedown" />
      <Section {...this.props}
        instructions={this.props.element.environment_instructions}
        data={this.props.data.sections_attributes.find(s => s.title === "Environment")}
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
          {this.props.data.ropes_attributes.map((rope, i) =>{
          const climb = rope.climbs_attributes[0];
          return <tr key ={i}>
            <td>{rope.identifier}</td>
            <td>
              <input type="number"
              value={climb.block_1 ? climb.block_1 : ""}
              name="block_1"
              rope-id={rope.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block_2 ? climb.block_2 : ""}
              name="block_2"
              rope-id={rope.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block_3 ? climb.block_3 : ""}
              name="block_3"
              rope-id={rope.id}
              onChange={this.props.handleChange} />
            </td>
            <td>
              <input type="number"
              value={climb.block_4 ? climb.block_4 : ""}
              name="block_4"
              rope-id={rope.id}
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