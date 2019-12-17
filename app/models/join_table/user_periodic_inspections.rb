class JoinTable::UserPeriodicInspections < ApplicationRecord
  self.table_name = "user_periodic_inspections"
  belongs_to :user
  belongs_to :periodic_inspection
end
