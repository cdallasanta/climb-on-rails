class Inputs::ClimbInput < Types::BaseInputObject
  graphql_name "ClimbInput"

  argument :id, Integer, required: false
  argument :block1, Integer, as: :block_1, required: false
  argument :block2, Integer, as: :block_2, required: false
  argument :block3, Integer, as: :block_3, required: false
  argument :block4, Integer, as: :block_4, required: false
end