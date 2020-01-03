module Types
  class PreuseInspectionType < Types::BaseObject
    field :date, String, null: false
    field :setup, SetupType, null: false
    field :takedown, TakedownType, null: false
  end
end
