require 'rails_helper'

RSpec.describe Site, type: :model do
  subject{ Site.new(name:"test site")}

  it "should have a name" do
    expect(subject.name).not_to be_nil
  end
end
