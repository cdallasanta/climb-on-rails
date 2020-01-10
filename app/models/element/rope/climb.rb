class Element::Rope::Climb < ApplicationRecord
  self.table_name = "climbs"
  belongs_to :rope, class_name: "Element::Rope"
  belongs_to :takedown, class_name: "PreuseInspection::Takedown"

  #  TODO when is this used?
  def all_blocks_empty?
    block_1 == nil &&
    block_2 == nil &&
    block_3 == nil &&
    block_4 == nil
  end
end
