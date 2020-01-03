module Mutations
  class SignInUser < BaseMutation
    argument :email, String, null: false
    argument :password, String, null: false
    
    field :user, Types::UserType, null: true

    def resolve(email:, password:)
      @user = User.find_by(email)

      if @user && @user.authenticate(password)
        return @user
      else
        return {
          status: 401,
          errors: ["Email and password did not match a user on file. Please try again."]
        }
      end
    end
  end
end