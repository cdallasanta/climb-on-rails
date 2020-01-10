module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :fullname, String, null: false
    field :site, SiteType, null: false

  end
end
