class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :balance, :email
end
