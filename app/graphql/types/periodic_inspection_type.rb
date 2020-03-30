class Types::PeriodicInspectionType < Types::BaseObject
  field :id, Integer, null: true
  field :date, String, null: false
  field :sections, [Types::SectionType], null: false
  field :users, [Types::UserType], null: true
end
