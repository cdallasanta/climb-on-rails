class SetupSerializer < ActiveModel::Serializer
  attributes :id, :sections_attributes
  has_many :users

  def sections_attributes
    ActiveModel::SerializableResource.new(object.sections,  each_serializer: SectionSerializer)
  end
end