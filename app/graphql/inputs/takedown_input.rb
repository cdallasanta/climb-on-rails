class Inputs::TakedownInput < Types::BaseInputObject
  graphql_name "TakedownInput"

  argument :id, Integer, required: false
  argument :sectionsAttributes, [Inputs::SectionInput], as: :sections_attributes, required: true
  argument :climbsAttributes, [Inputs::ClimbInput], as: :climbs_attributes, required: true
end