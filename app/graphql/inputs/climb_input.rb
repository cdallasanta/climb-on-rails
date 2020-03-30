class Inputs::ClimbInput < Types::BaseInputObject
  graphql_name "ClimbInput"

  argument :id, Integer, required: true
  argument :block1, Integer, as: :block_1, required: true
  argument :block2, Integer, as: :block_2, required: true
  argument :block3, Integer, as: :block_3, required: true
  argument :block4, Integer, as: :block_4, required: true
end