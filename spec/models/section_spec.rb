require 'rails_helper'

RSpec.describe Section, type: :model do
  subject {Section.new(inspection: PeriodicInspection.new)}

  it "defaults to being false on creation" do
    expect(subject.complete).to be false
  end

  it "belongs to an inspection type" do
    expect(subject.inspection_type).to be_in(["PeriodicInspection", "PreuseInspection"])
  end

  it "can be toggled to 'complete'" do
    subject.complete = true
    expect(subject.complete).to be true
  end
end
