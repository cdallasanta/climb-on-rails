class PreuseInspection < ApplicationRecord
  belongs_to :element
  has_one :setup, class_name: "PreuseInspection::Setup"
  has_one :takedown, class_name: "PreuseInspection::Takedown"
  accepts_nested_attributes_for :setup
  accepts_nested_attributes_for :takedown
  after_initialize :create_children

  validates :date, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  def create_children
    self.setup ||= PreuseInspection::Setup.new
    self.takedown ||= PreuseInspection::Takedown.new
  end
end
