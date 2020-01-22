require 'rails_helper'

RSpec.describe Element::Rope::Climb, type: :model do
  before(:all) do
    @element = Element.create(name:"test element")
    @element.ropes.build(identifier:"test rope")
    @preuse = PreuseInspection.create(element:@element, date:Date.today)
    @preuse.setup.sections.each do |section|
      section.update(complete: true)
    end
    @preuse.save
  end
  
  after(:all) do
    Element::Rope::Climb.destroy_all
    Element.destroy_all
    PreuseInspection.destroy_all
  end

  subject {@element.ropes.last.climbs.build(takedown:@preuse.takedown)}

  it "belongs to a Rope" do
    expect(subject.rope).to be_a Element::Rope
  end

  it "belongs to a Takedown" do
    expect(subject.takedown).to be_a PreuseInspection::Takedown
  end

  it "can have climbs set to its 4 blocks" do
    subject.update(block_1: 1, block_2: 2, block_3: 3, block_4: 4)
    expect(subject).to have_attributes({
      block_1: 1,
      block_2: 2,
      block_3: 3,
      block_4: 4,
    })
  end
end
