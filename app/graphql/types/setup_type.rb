class Types::SetupType < Types::BaseObject
  field :id, Integer, null: true
  field :sections, [Types::SectionType], null: false
  field :is_complete, Boolean, null: false
  field :users, [Types::UserType], null: true

  def is_complete
    object.sections.all? do |section|
      section.complete
    end
  end
end
