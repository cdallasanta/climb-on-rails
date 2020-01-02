module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :fullname, String, null: false
    field :email, String, null: false
  end
end
