class Inputs::PreuseInput < Types::BaseInputObject
  graphql_name "PreuseInput"

  argument :id, Integer, required: false
  argument :date, String, required: true
  argument :elementId, Integer, as: :element_id, required: true
  argument :setupAttributes, Inputs::SetupInput, as: :setup_attributes, required: true
  argument :takedownAttributes, Inputs::TakedownInput, as: :takedown_attributes, required: false
end