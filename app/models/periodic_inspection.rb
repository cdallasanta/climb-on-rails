class PeriodicInspection < ApplicationRecord
  belongs_to :element
  has_many :user_periodic_inspections, class_name: "JoinTable::UserPeriodicInspections"
  has_many :users, through: :user_periodic_inspections
  has_many :sections, as: :inspection
  accepts_nested_attributes_for :sections

  validates :date, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  def self.find_or_init_past_inspection(args)
    self.find_or_initialize_by(args)
  end
end