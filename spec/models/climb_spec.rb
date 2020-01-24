require 'rails_helper'

RSpec.configure do |c|
  c.extend CommonSetup 
end

RSpec.describe Element::Rope::Climb, type: :model do
  setup_vars

  let(:good_preuse) do
    insp= PreuseInspection.create(element:good_element, date:Date.today)
    insp.setup.sections.each do |section|
      section.update(complete: true)
    end
    insp.save
    insp
  end

  subject(:test_climb) do
    good_rope.climbs.create(takedown:good_preuse.takedown)
  end

  it "belongs to a Rope" do
    expect(test_climb.rope).to be_a Element::Rope
  end

  it "belongs to a Takedown" do
    expect(test_climb.takedown).to be_a PreuseInspection::Takedown
  end

  it "can have climbs set to its 4 blocks" do
    test_climb.update(block_1: 1, block_2: 2, block_3: 3, block_4: 4)
    expect(test_climb).to have_attributes({
      block_1: 1,
      block_2: 2,
      block_3: 3,
      block_4: 4,
    })
  end
end
