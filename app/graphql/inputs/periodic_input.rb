class Inputs::PeriodicInput < Types::BaseInputObject
  graphql_name "PeriodicInput"

  argument :id, Integer, required: false
  argument :date, String, required: true
  argument :elementId, Integer, as: :element_id, required: true
  argument :sectionsAttributes, [Inputs::SectionInput], as: :sections_attributes, required: true
end