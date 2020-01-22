require 'rails_helper'

RSpec.describe PreuseInspection::Setup, type: :model do
  subject {PreuseInspection::Setup.new(preuse_inspection: PreuseInspection.new)}

  it "is initialized with three Sections" do
    expect(subject.sections.length).to eq 3
  end
  
  it "belongs to a PreuseInspection" do
    expect(subject.preuse_inspection).to be_a PreuseInspection
  end

  it "has a method #status" do
    expect(subject).to respond_to(:status)
  end
  
  context "#status" do
    it "returns 'complete' when all sections are complete" do
      insp = PreuseInspection::Setup.new(preuse_inspection: PreuseInspection.new)
      insp.sections.each do |section|
        section.complete = true
      end
      expect(insp.status).to eq("complete")
    end

    it "returns 'incomplete' when there is a mix of complete and incomplete sections" do
      insp = PreuseInspection::Setup.new(preuse_inspection: PreuseInspection.new)
      insp.sections.first.complete = true
      expect(insp.status).to eq("incomplete")
    end

    it "returns 'not started' when all sections are incomplete" do
      insp = PreuseInspection::Setup.new(preuse_inspection: PreuseInspection.new)
      expect(insp.status).to eq("not started")
    end

    it "returns 'incomplete' all sections are incomplete, but the setup has been saved to the database" do
      insp = PreuseInspection::Setup.create(preuse_inspection: PreuseInspection.create)
      expect(insp.status).to eq("incomplete")
    end
  end
end
