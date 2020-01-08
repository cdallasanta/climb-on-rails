Inputs::PeriodicInput = GraphQL::InputObjectType.define do
  name "PeriodicInput"

  argument :id, types.ID
  argument :date, types.String
  argument :elementId, types.ID, as: :element_id
  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
end