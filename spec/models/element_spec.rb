require 'rails_helper'

RSpec.describe Element, type: :model do
  subject {Element.create(name:"test element", site:Site.create(name:"test site"))}

  it "must have a name" do
    expect(Element.new).not_to be_valid
  end

  it "belongs to a site" do
    expect(subject.site).to be_a Site
  end

  it "can have many ropes" do
    subject.ropes.build(identifier: "test rope 1")
    subject.ropes.build(identifier: "test rope 2")
    subject.ropes.build(identifier: "test rope 3")
    expect(subject.ropes.length).to eq 3
  end
end
