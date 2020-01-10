class PreuseInspection < ApplicationRecord
  belongs_to :element
  has_one :setup, class_name: "PreuseInspection::Setup"
  has_one :takedown, class_name: "PreuseInspection::Takedown"
  accepts_nested_attributes_for :setup
  accepts_nested_attributes_for :takedown
  after_initialize :create_setup

  validates :date, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  def create_setup
    self.setup ||= PreuseInspection::Setup.new
  end
  
  def create_takedown(current_user)
    self.takedown ||= PreuseInspection::Takedown.create

    if self.takedown.climbs == []
      self.takedown.ropes.each do |rope|
        self.takedown.climbs.create(rope:rope)
      end
    end
  end
end
