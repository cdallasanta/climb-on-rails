class SiteSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :elements
  belongs_to :contact
end