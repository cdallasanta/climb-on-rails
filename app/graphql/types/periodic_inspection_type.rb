module Types
  class PeriodicInspectionType < Types::BaseObject
    field :date, String, null: false
    field :sections, [SectionType], null: false
  end
end
