Inputs::TakedownInput = GraphQL::InputObjectType.define do
  name "TakedownInput"

  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
end