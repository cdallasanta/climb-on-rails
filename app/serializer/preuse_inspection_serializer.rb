class PreuseInspectionSerializer < ActiveModel::Serializer
  attributes :date, :id, :setup_attributes, :takedown_attributes
  belongs_to :element

  def element
    {
      id: object.element.id,
      name: object.element.name,
      element_instructions: object.element.periodic_element_instructions,
      equipment_instructions: object.element.periodic_equipment_instructions,
      environment_instructions: object.element.periodic_environment_instructions
    }
  end

  
  def setup_attributes
    SetupSerializer.new(object.setup)
  end

  def takedown_attributes
    if object.takedown
      TakedownSerializer.new(object.takedown, root: false)
    end
  end
end