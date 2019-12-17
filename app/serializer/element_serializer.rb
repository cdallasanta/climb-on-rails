class ElementSerializer < ActiveModel::Serializer
  attributes :id, :name, :site_id, :instructions

  def instructions
    return {
      preuse: {
        setup: {
          equipment: object.setup_equipment_instructions,
          element: object.setup_element_instructions,
          environment: object.setup_environment_instructions
        },
        takedown: {
          equipment: object.takedown_equipment_instructions,
          element: object.takedown_element_instructions,
          environment: object.takedown_environment_instructions
        }
      },
      periodic: {
        equipment: object.periodic_equipment_instructions,
        element: object.periodic_element_instructions,
        environment: object.periodic_environment_instructions
      }
    }
  end
end