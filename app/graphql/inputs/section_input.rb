Inputs::SectionInput = GraphQL::InputObjectType.define do
  name "SectionInput"

  argument :id, types.ID
  argument :title, types.String
  argument :complete, types.Boolean
  argument :commentsAttributes, types[Inputs::CommentInput], as: :comments_attributes
end