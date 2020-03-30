class Types::CommentType < Types::BaseObject
  field :id, Integer, null: true
  field :user, Types::UserType, null: true
  field :content, String, null: true
end
