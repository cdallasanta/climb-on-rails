module Types
  class RopeType < Types::BaseObject
    field :id, Integer, null: true
    field :climbs, [ClimbType], null: true
    field :identifier, String, null: false
  end
end
