class PreuseInspection::Takedown < ApplicationRecord
  self.table_name = "takedowns"
  belongs_to :preuse_inspection
  has_many :user_takedowns, class_name: "JoinTable::UserTakedowns"
  has_many :users, through: :user_takedowns
  has_one :element, through: :preuse_inspection
  has_many :climbs, class_name: "Element::Rope::Climb"
  has_many :comments, as: :commentable
  has_many :ropes, through: :preuse_inspection, class_name: "Element::Rope"
  accepts_nested_attributes_for :ropes
  accepts_nested_attributes_for :comments
  accepts_nested_attributes_for :climbs

  after_create :default_to_false

  def default_to_false
    self.equipment_complete ||= false
    self.element_complete ||= false
    self.environment_complete ||= false
    self.save
  end
end
