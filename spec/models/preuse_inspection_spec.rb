require 'rails_helper'

RSpec.describe PreuseInspection, type: :model do
  subject {PreuseInspection.new(element:Element.new, date:Date.today)}

  it "has a Setup" do
    expect(subject.setup).to be_a PreuseInspection::Setup
  end

  it "has a Takedown once the setup is completed" do
    insp = PreuseInspection.create(element:Element.create, date:Date.today)
    insp.setup.sections.each do |section|
      section.update(complete:true)
    end
    insp.save
    expect(insp.takedown).to be_a PreuseInspection::Takedown
  end

  it "belongs to an element" do
    expect(subject.element).to be_a Element
  end
end
