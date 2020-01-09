Inputs::SetupInput = GraphQL::InputObjectType.define do
  name "SetupInput"

  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
end