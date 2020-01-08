Inputs::SectionInput = GraphQL::InputObjectType.define do
  name "SectionInput"

  argument :id, types.ID
  argument :title, types.String
  argument :complete, types.Boolean
end