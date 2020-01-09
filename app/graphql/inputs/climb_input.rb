Inputs::ClimbInput = GraphQL::InputObjectType.define do
  name "ClimbInput"

  argument :id, types.ID
  argument :ropeId, types.ID, as: :rope_id
  argument :block1, types.Int, as: :block_1
  argument :block2, types.Int, as: :block_2
  argument :block3, types.Int, as: :block_3
  argument :block4, types.Int, as: :block_4
end