module Types
  class SectionType < Types::BaseObject
    field :id, Integer, null: true
    field :title, String, null: false
    field :complete, Boolean, null: true
    field :comments, [CommentType], null: true
  end
end
