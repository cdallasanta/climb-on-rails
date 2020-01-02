module Types
  class SiteType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :elements, [ElementType], null: true
    field :contact, UserType, null: true
  end
end
