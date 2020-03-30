class Types::UserType < Types::BaseObject
  field :id, Integer, null: false
  field :fullname, String, null: false
  field :site, Types::SiteType, null: false
  field :is_complete, Boolean, null: false
end
# Types::UserType = GraphQL::ObjectType.define do