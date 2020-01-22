require 'rails_helper'

RSpec.describe PreuseInspection::Takedown, type: :model do
  before(:all) do
    @element = Element.create(name:"test element", site:Site.create(name:"test site"))
    rope1 = @element.ropes.create(element:@element, identifier:"test rope 1")
    rope2 = @element.ropes.create(element:@element, identifier:"test rope 2")
    rope3 = @element.ropes.create(element:@element, identifier:"test rope 3")
    preuse = PreuseInspection.new(element:@element, date:Date.today)
    preuse.setup.sections.each do |section|
      section.update(complete:true)
    end
    preuse.save  # this is when the takedown is created, in the before_save method

    @takedown = preuse.takedown
  end

  it "is initialized with three Sections" do
    expect(@takedown.sections.length).to eq 3
  end
  
  it "belongs to a PreuseInspection" do
    expect(@takedown.preuse_inspection).to be_a PreuseInspection
  end

  it "has a climb for each rope climbs" do
    expect(@takedown.climbs.length).to eq(@takedown.preuse_inspection.element.ropes.length)
  end
end
