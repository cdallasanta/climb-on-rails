module Types
  class TakedownType < Types::BaseObject
    field :sections, [SectionType], null: false
    field :ropes, [RopeType], null: true
    field :users, [UserType], null: true
  end
end
