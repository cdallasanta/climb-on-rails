module Types
  class PreuseInspectionType < Types::BaseObject
    field :id, Integer, null: true
    field :date, String, null: false
    field :setup, SetupType, null: false
    field :takedown, TakedownType, null: true
  end
end
