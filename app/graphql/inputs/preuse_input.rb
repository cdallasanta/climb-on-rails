Inputs::PreuseInput = GraphQL::InputObjectType.define do
  name "PreuseInput"

  argument :id, types.ID
  argument :date, types.String
  argument :elementId, types.ID, as: :element_id
  argument :setupAttributes, Inputs::SetupInput, as: :setup_attributes
  argument :takedownAttributes, Inputs::TakedownInput, as: :takedown_attributes
end