require 'rails_helper'

RSpec.describe Element::Rope, type: :model do
  subject {Element::Rope.new(element:Element.new, identifier: "test rope")}

  it "has an identifier" do
    expect(subject.identifier).to eq("test rope")
  end

  it "belongs to an element" do
    expect(subject.element).to be_a Element
  end

  it "can have many climbs" do
    subject.climbs.build
    subject.climbs.build
    subject.climbs.build
    expect(subject.climbs.length).to eq 3
  end

  it "has a method #climb_count" do
    expect(subject).to respond_to(:climb_count)
  end

  it "#climb_count that can return its total number of climbs" do
    subject.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    subject.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    subject.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    expect(subject.climb_count).to eq (30)
  end

  it "has an attribute 'retired'" do
    expect(subject.attributes).to include("retired") 
  end

  it "defaults to not being retired on creation" do
    rope = Element::Rope.new
    expect(rope.retired).to be false
  end
end
