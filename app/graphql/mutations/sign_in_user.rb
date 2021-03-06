module Mutations
  class SignInUser < Mutations::BaseMutation
    null true

    argument :email, String, required: true
    argument :password, String, required: true
    
    field :token, String, null: false
    field :user, Types::UserType, null: false

    def resolve(email:, password:)
      user = User.find_by(email: email)

      return unless user && user.authenticate(password)

      # use Ruby on Rails - ActiveSupport::MessageEncryptor, to build a token
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secret_key_base.byteslice(0..31))
      token = crypt.encrypt_and_sign("user-id:#{ user.id }")

      context[:session][:token] = token
      
      {user: user, token: token}
    end
  end
end