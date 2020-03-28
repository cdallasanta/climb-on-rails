class PreuseInspection < ApplicationRecord
  belongs_to :element
  has_one :setup, class_name: "PreuseInspection::Setup"
  has_one :takedown, class_name: "PreuseInspection::Takedown"
  accepts_nested_attributes_for :setup
  accepts_nested_attributes_for :takedown

  after_initialize :create_setup
  after_save :before_save

  validates :date, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  def create_setup
    self.setup ||= PreuseInspection::Setup.new
  end

  def before_save
    if self.setup.is_complete? && self.takedown == nil
      self.takedown = PreuseInspection::Takedown.new
      self.element.ropes.each do |rope|
        self.takedown.climbs.new(rope:rope)
      end
    end
  end
end
