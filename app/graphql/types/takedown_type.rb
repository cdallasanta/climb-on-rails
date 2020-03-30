class Types::TakedownType < Types::BaseObject
  field :id, Integer, null: true
  field :sections, [Types::SectionType], null: false
  field :users, [Types::UserType], null: false
  field :climbs, [Types::ClimbType], null: true
end
