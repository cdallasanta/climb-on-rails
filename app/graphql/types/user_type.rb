module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :fullname, String, null: false
    # TODO: remove bottom line for security
    field :email, String, null: false
  end
end
