Inputs::CommentInput = GraphQL::InputObjectType.define do
  name "CommentInput"

  argument :content, types.String
  argument :id, types.ID
end