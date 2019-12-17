class PreuseInspection::Setup < ApplicationRecord
  self.table_name = "setups"
  belongs_to :preuse_inspection
  has_many :user_setups, class_name: "JoinTable::UserSetups"
  has_many :users, through: :user_setups
  has_many :sections, as: :inspection
  has_one :element, through: :preuse_inspection
  accepts_nested_attributes_for :sections

  after_initialize :create_sections

  def create_sections
    if self.sections.length != 3
      self.sections.new(title: "Element")
      self.sections.new(title: "Equipment")
      self.sections.new(title: "Environment")
    end
  end

  def is_complete?
    !self.sections.any?{|s| s.complete == false}
  end

  def status
    if is_complete?
      return "complete"
    elsif self.sections.all?{|s| s.complete == false}
      return "not started"
    else
      return "incomplete"
    end
  end
end
