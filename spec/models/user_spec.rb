require 'rails_helper'

RSpec.describe User, type: :model do
  before(:all) do
    Site.create(name:"test site")
  end

  let(:good_user) {User.create(fullname: "test user", email:"test@email.com", site_id:Site.all.last.id, password:"demopass")}
  
  it "can be created with a username, email, password, and site" do
    expect(good_user.fullname).to eq("test user")
  end

  it "must have a valid and unique email address" do
    duplicate_email_user = User.new(email: good_user.email)
    expect(duplicate_email_user.valid?).to be false
  end

  it "must have a password" do
    no_password = User.new(fullname:"no password", email: "no_password@email.com", site: Site.new(name:"Orkila"))

    expect(no_password.valid?).to be false
  end

  it "should be connected to a site" do
    expect(good_user.site).to be_a Site
  end
end