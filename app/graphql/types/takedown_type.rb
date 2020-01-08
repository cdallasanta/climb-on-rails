module Types
  class TakedownType < Types::BaseObject
    field :sections, [SectionType], null: false
    field :ropes, [RopeType], null: false
    field :users, [UserType], null: false

    # This needs to be manually defined because of how the associations and "through"s work (or aren't)
    def ropes
      object.preuse_inspection.element.ropes
    end
  end
end
