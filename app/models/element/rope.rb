class Element::Rope < ApplicationRecord
  self.table_name = "ropes"
  belongs_to :element
  has_many :climbs, class_name: "Element::Rope::Climb"
  has_many :preuse_inspections, through: :element
  accepts_nested_attributes_for :climbs

  validates :identifier, presence: true, uniqueness: {scope: :element}
  validates_presence_of :element

  after_create :not_retired

  def not_retired
    self.retired ||= false
    self.save
  end

  # returns the number of climbs this rope has received in its life
  # note: not the number of Climb objects, but the number of uses
  def climb_count
    self.climbs.inject(0) do |sum, climb|
      sum += climb.block_1 if climb.block_1
      sum += climb.block_2 if climb.block_2
      sum += climb.block_3 if climb.block_3
      sum += climb.block_4 if climb.block_4
      sum
    end
  end
end
