require 'rails_helper'

RSpec.describe PeriodicInspection, type: :model do
  subject {PeriodicInspection.new(element: Element.new, date:Date.today)}

  it "has three sections" do
    expect(subject.sections.length).to eq 3
  end

  it "has a date" do
    expect(subject.date).to eq Date.today
  end

  it "is connected to an element" do
    expect(subject.element).to be_a Element
  end
end
