class PreuseInspection::Takedown < ApplicationRecord
  self.table_name = "takedowns"
  belongs_to :preuse_inspection
  has_many :user_takedowns, class_name: "JoinTable::UserTakedowns"
  has_many :users, through: :user_takedowns
  has_many :climbs, class_name: "Element::Rope::Climb"
  has_many :ropes, through: :climbs, class_name: "Element::Rope"
  has_many :sections, as: :inspection
  accepts_nested_attributes_for :sections
  accepts_nested_attributes_for :ropes
  accepts_nested_attributes_for :climbs

  after_initialize :create_sections_and_climbs
  
  def create_sections_and_climbs
    if self.sections.length != 3
      self.sections.new(title: "Element")
      self.sections.new(title: "Equipment")
      self.sections.new(title: "Environment")
    end

    if self.climbs == []
      self.ropes.each do |rope|
        self.climbs.create(rope:rope)
      end
    end
  end

  def status
    if !self.sections.any?{|s| s.complete == false}
      return "complete"
    elsif self.sections.all?{|s| s.complete == false} &&
        self.climbs.all?{|c| c.all_blocks_empty?}
      return "not started"
    else
      return "incomplete"
    end
  end
end
