module Types
  class SectionType < Types::BaseObject
    field :title, String, null: false
    field :complete, Boolean, null: true
  end
end
