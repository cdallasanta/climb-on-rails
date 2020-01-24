require 'rails_helper'

RSpec.describe Element::Rope, type: :model do
  subject(:good_rope) {Element::Rope.new(element:Element.new, identifier: "test rope")}

  it "has an identifier" do
    expect(good_rope.identifier).to eq("test rope")
  end

  it "belongs to an element" do
    expect(good_rope.element).to be_a Element
  end

  it "can have many climbs" do
    good_rope.climbs.build
    good_rope.climbs.build
    good_rope.climbs.build
    expect(good_rope.climbs.length).to eq 3
  end

  it "has a method #climb_count" do
    expect(good_rope).to respond_to(:climb_count)
  end

  it "#climb_count that can return its total number of climbs" do
    good_rope.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    good_rope.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    good_rope.climbs.build(block_1:1, block_2:2, block_3:3, block_4:4)
    expect(good_rope.climb_count).to eq (30)
  end

  it "has an attribute 'retired'" do
    expect(good_rope.attributes).to include("retired") 
  end

  it "defaults to not being retired on creation" do
    rope = Element::Rope.new
    expect(rope.retired).to be false
  end
end
