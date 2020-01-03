module Types
  class TakedownType < Types::BaseObject
    field :sections, [SectionType], null: false
  end
end
