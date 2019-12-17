class JoinTable::UserTakedowns < ApplicationRecord
  self.table_name = "user_takedowns"
  belongs_to :user
  belongs_to :takedown, :class_name => "PreuseInspection::Takedown"
end
