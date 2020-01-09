Inputs::SetupInput = GraphQL::InputObjectType.define do
  name "SetupInput"

  argument :id, types.ID
  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
end