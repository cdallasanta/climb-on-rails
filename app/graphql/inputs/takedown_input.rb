Inputs::TakedownInput = GraphQL::InputObjectType.define do
  name "TakedownInput"

  argument :sectionsAttributes, types[Inputs::SectionInput], as: :sections_attributes
  argument :climbsAttributes, types[Inputs::ClimbInput], as: :climbs_attributes
end