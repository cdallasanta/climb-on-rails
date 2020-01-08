module Types
  class SetupType < Types::BaseObject
    field :sections, [SectionType], null: false
    field :is_complete, Boolean, null: false

    def is_complete
      object.sections.all? do |section|
        section.complete
      end
    end
  end
end
