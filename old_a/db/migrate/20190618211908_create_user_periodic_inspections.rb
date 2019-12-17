class CreateUserPeriodicInspections < ActiveRecord::Migration[5.2]
  def change
    create_table :user_periodic_inspections do |t|
      t.integer :user_id
      t.integer :periodic_inspection_id
    end
  end
end
