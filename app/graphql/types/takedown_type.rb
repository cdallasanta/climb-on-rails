module Types
  class TakedownType < Types::BaseObject
    field :sections, [SectionType], null: false
    field :users, [UserType], null: false
    field :climbs, [ClimbType], null: true
  end
end
