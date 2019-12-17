class Section < ApplicationRecord
  belongs_to :inspection, polymorphic: true
  has_many :comments, as: :commentable
  accepts_nested_attributes_for :comments

  after_initialize :set_defaults

  def set_defaults
    self.complete ||= false
  end
end
