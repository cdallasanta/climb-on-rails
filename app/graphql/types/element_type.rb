module Types
  class ElementType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :setup_equipment_instructions, String, null: true
    field :setup_element_instructions, String, null: true
    field :setup_environment_instructions, String, null: true
    field :takedown_equipment_instructions, String, null: true
    field :takedown_element_instructions, String, null: true
    field :takedown_environment_instructions, String, null: true
    field :periodic_equipment_instructions, String, null: true
    field :periodic_element_instructions, String, null: true
    field :periodic_environment_instructions, String, null: true
  end
end
