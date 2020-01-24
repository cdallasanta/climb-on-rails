require "rails_helper"

RSpec.describe Types::QueryType do
  let(:user) { User.create(fullname: "test user", email:"test@email.com", password:"demopass", site:Site.new) }

  let(:signInMutation) do
    %(mutation($email: String!, $password: String!){
      signInUser(email: $email, password: $password){
        token
        user {
          fullname
          id
        }
      }
    })
  end

  context "SignInUser" do
    subject(:result) do
      ClimbOnSchema.execute(signInMutation, variables: {
        email: user.email,
        password: user.password
      },
      context:{
        current_user: nil,
        session: {}
      }).as_json
    end

    it "signs in a user" do
      expect(result["data"]["signInUser"]).not_to be_nil
    end

    it "returns the token after a successful sign in" do
      expect(result["data"]["signInUser"]["token"]).to be_a String
    end

    it "returns nil on an unsuccessful sign in" do
      bad_result = ClimbOnSchema.execute(signInMutation, variables: {
        email: "bas email",
        password: user.password
      },
      context:{
        current_user: nil,
        session: {}
      }).as_json

      expect(bad_result["data"]["signInUser"]).to be_nil 
    end
  end
end