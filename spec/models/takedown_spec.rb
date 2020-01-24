require 'rails_helper'

RSpec.describe PreuseInspection::Takedown, type: :model do
  setup_vars
  let(:good_takedown) do
    preuse = PreuseInspection.new(element:good_element, date:Date.today)
    preuse.setup.sections.each do |section|
      section.update(complete:true)
    end
    preuse.save  # this is when the takedown is created, in the before_save method
    
    preuse.takedown
  end

  it "is initialized with three Sections" do
    expect(good_takedown.sections.length).to eq 3
  end
  
  it "belongs to a PreuseInspection" do
    expect(good_takedown.preuse_inspection).to be_a PreuseInspection
  end

  it "has a climb for each rope climbs" do
    expect(good_takedown.climbs.length).to eq(good_takedown.preuse_inspection.element.ropes.length)
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
