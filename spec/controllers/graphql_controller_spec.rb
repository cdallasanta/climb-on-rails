require 'rails_helper'

RSpec.describe GraphqlController, type: :controller do
  let(:user){User.create(fullname: "test user", email:"test@email.com", password:"demopass", site:Site.new)}

  context "Sign In mutation" do
    it "can sign a user in" do
      post 'execute', params:{query:signInMutation(user.email, user.password)}
      expect(session["token"]).not_to be_nil
    end

    it "sets #current_user on the controller" do
      post 'execute', params:{query:signInMutation(user.email, user.password)}
      expect(controller.send(:current_user)).to eq user
    end

    it "does not add session token signin info is incorrect" do
      post 'execute', params:{query:signInMutation("bad email", user.password)}
      expect(session["token"]).to be_nil
    end

  end

  def signInMutation(email, password)
    <<-GQL
      mutation{
        signInUser(email: \"#{email}\", password: \"#{password}\"){
          token
          user {
            fullname
            id
          }
        }
      }
    GQL
  end
end
