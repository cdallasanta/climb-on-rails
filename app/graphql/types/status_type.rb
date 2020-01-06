module Types
  class StatusType < Types::BaseObject
    field :name, String, null: false
    field :id, Integer, null: false
    field :setup, String, null: false
    field :takedown, String, null: false
  end
end
