module Mutations
  class CreateUser < Mutations::BaseMutation
    argument :fullname, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    type Types::UserType

    def resolve(fullname:, email:, password:)
      # TODO this
    end
  end
end