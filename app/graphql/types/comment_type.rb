module Types
  class CommentType < Types::BaseObject
    field :id, Integer, null: true
    field :user, UserType, null: true
    field :content, String, null: true
  end
end
