require 'rails_helper'

RSpec.describe GraphqlController, type: :controller do
  let(:user){User.create(fullname: "test user", email:"test@email.com", password:"demopass", site:Site.new)}

  context "Sign In mutation" do
    it "can sign a user in" do
      post 'execute', params:{query:signInMutation(user.email, user.password)}
      expect(session["token"]).not_to be_nil
    end

    it "allows the controller to call #current_user" do
      post 'execute', params:{query:signInMutation(user.email, user.password)}
      expect(controller.send(:current_user)).to eq user
    end

    it "does not add session token signin info is incorrect" do
      post 'execute', params:{query:signInMutation("bad email", user.password)}
      expect(session["token"]).to be_nil
    end
  end

  context "Sign Out mutation" do
    before(:each) {post 'execute', params:{query:signInMutation(user.email, user.password)}}

    it "signs the user out" do
      post 'execute', params:{query:signOutMutation}
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

  def signOutMutation
    <<-GQL
      mutation{
        signOutUser{
          status
          loggedOut
        }
      }
    GQL
  end
end
