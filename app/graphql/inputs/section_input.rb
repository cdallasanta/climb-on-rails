class Inputs::SectionInput < Types::BaseInputObject
  graphql_name "SectionInput"

  argument :id, Integer, required: true
  argument :title, String, required: true
  argument :complete, Boolean, required: true
  argument :commentsAttributes, [Inputs::CommentInput], as: :comments_attributes, required: true
end