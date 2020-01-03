module Mutations
  class CreateUser < BaseMutation
    argument :fullname, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    type Types::UserType

    def resolve(fullname:, email:, password:)
      User.create!(
        fullname: fullname,
        email: email,
        password: password
      )
    end
  end
end