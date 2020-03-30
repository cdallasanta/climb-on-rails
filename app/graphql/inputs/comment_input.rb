class Inputs::CommentInput < Types::BaseInputObject
  graphql_name "CommentInput"

  argument :content, String, required: true
  argument :id, Integer, required: false
end