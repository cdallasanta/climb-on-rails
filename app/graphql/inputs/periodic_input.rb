Inputs::PeriodicInput = GraphQL::InputObjectType.define do
  name "PeriodicInput"

  argument :id, types.ID
  argument :date, types.String
  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
end