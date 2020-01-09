module Types
  class ClimbType < Types::BaseObject
    field :id, Integer, null: true
    field :rope, RopeType, null: false
    field :block_1, Integer, null: true
    field :block_2, Integer, null: true
    field :block_3, Integer, null: true
    field :block_4, Integer, null: true
  end
end
