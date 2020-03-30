class Types::PreuseInspectionType < Types::BaseObject
  field :id, Integer, null: true
  field :date, String, null: false
  field :setup, Types::SetupType, null: false
  field :takedown, Types::TakedownType, null: true
end