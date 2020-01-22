require 'rails_helper'

RSpec.describe Site, type: :model do
  subject{ Site.new(name:"test site")}

  it "must have a name" do
    expect(Site.new).not_to be_valid
  end

  it "should be able to have many elements" do
    subject.elements.build()
    subject.elements.build()
    subject.elements.build()
    expect(subject.elements.length).to eq 3
  end
end
