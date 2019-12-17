class TakedownSerializer < ActiveModel::Serializer
  attributes :id, :sections_attributes, :ropes_attributes
  has_many :users
  
  def sections_attributes
    ActiveModel::SerializableResource.new(object.sections,  each_serializer: SectionSerializer)
  end

  def ropes_attributes
    ropes = []
    object.preuse_inspection.element.ropes.each do |rope|
      ropes << {
        id: rope.id,
        identifier: rope.identifier,
        climbs_attributes: rope.climbs.where(takedown_id: object.id)
      }
    end
    return ropes
  end
end