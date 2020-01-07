module Types
  class PeriodicInspectionType < Types::BaseObject
    field :id, Integer, null: true
    field :date, String, null: false
    field :sections, [SectionType], null: false
    field :users, [UserType], null: true
  end
end
