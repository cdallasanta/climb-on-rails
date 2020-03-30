class Types::SectionType < Types::BaseObject
  field :id, Integer, null: true
  field :title, String, null: false
  field :complete, Boolean, null: true
  field :comments, [Types::CommentType], null: true
end