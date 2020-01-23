require 'rails_helper'

RSpec.describe GraphqlController, type: :controller do
  let(:user){User.create(email:"test@email.com", password:"demopass", site:Site.new)}

  context "Sign In mutation" do
    it "can sign a user in" do
      
    end

    it "sets #current_user on the controller" do
      
    end

    it "returns null when signin info is incorrect" do

    end

  end

  def signInMutation(email, password)
    <<-GQL
      mutation{
        signInUser(email: #{email}, password: #{password}){
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
