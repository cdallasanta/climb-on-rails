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

  after(:all) do
    Element.destroy_all
    Element::Rope.destroy_all
    PreuseInspection.destroy_all
    PreuseInspection::Takedown.destroy_all
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

  it "has a method #status" do
    expect(subject).to respond_to(:status)
  end

  context "#status" do
    it "returns 'complete' when all sections are complete" do
      insp = PreuseInspection::Takedown.new(preuse_inspection: PreuseInspection.new)
      insp.sections.each do |section|
        section.complete = true
      end
      expect(insp.status).to eq("complete")
    end

    it "returns 'incomplete' when there is a mix of complete and incomplete sections" do
      insp = PreuseInspection::Takedown.new(preuse_inspection: PreuseInspection.new)
      insp.sections.first.complete = true
      expect(insp.status).to eq("incomplete")
    end

    it "returns 'not started' when all sections are incomplete" do
      insp = PreuseInspection::Takedown.new(preuse_inspection: PreuseInspection.new)
      expect(insp.status).to eq("not started")
    end

    it "returns 'incomplete' when all sections are incomplete, a user has edited it" do
      insp = PreuseInspection::Takedown.create(preuse_inspection: PreuseInspection.create)
      insp.users << User.new(site:Site.all.last, password:"demopass")
      expect(insp.status).to eq("incomplete")
    end
  end
end
