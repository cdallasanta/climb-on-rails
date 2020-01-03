module Types
  class SetupType < Types::BaseObject
    field :sections, [SectionType], null: false
  end
end
