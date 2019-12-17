class PeriodicInspection < ApplicationRecord
  belongs_to :element
  has_many :user_periodic_inspections, class_name: "JoinTable::UserPeriodicInspections"
  has_many :users, through: :user_periodic_inspections
  has_many :comments, as: :commentable
  accepts_nested_attributes_for :comments

  validates :date, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  # def self.find_or_create_todays_inspection(element_id)
  #   self.where(date:Date.today.strftime("%Y-%m-%d").to_s , element_id: element_id).first_or_create
  # end

  def self.find_or_init_past_inspection(date, element_id)
    self.find_or_initialize_by(date: Date.strptime(date, "%Y-%m-%d"), element_id: element_id)
  end
end