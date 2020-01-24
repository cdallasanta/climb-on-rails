require 'rails_helper'

RSpec.describe Element, type: :model do
  setup_vars

  it "must have a name" do
    expect(Element.new).not_to be_valid
  end

  it "belongs to a site" do
    expect(good_element.site).to be_a Site
  end

  it "can have many ropes" do
    good_element.ropes = []
    good_element.ropes.build(identifier: "test rope 1")
    good_element.ropes.build(identifier: "test rope 2")
    good_element.ropes.build(identifier: "test rope 3")
    expect(good_element.ropes.length).to eq 3
  end
end
