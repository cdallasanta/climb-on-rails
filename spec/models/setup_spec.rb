require 'rails_helper'

RSpec.describe PreuseInspection::Setup, type: :model do
  subject {PreuseInspection::Setup.new(preuse_inspection: PreuseInspection.new)}

  it "is initialized with three Sections" do
    expect(subject.sections.length).to eq 3
  end
  
  it "belongs to a PreuseInspection" do
    expect(subject.preuse_inspection).to be_a PreuseInspection
  end
end
