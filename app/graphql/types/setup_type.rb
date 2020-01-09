module Types
  class SetupType < Types::BaseObject
    field :id, ID, null: true
    field :sections, [SectionType], null: false
    field :is_complete, Boolean, null: false
    field :users, [UserType], null: true

    def is_complete
      object.sections.all? do |section|
        section.complete
      end
    end
  end
end
