class UserSerializer < ActiveModel::Serializer
  attributes :id, :fullname, :email, :site_id
end