class CreatePeriodicInspections < ActiveRecord::Migration[5.2]
  def change
    create_table :periodic_inspections do |t|
      t.boolean :equipment_complete
      t.boolean :element_complete
      t.boolean :environment_complete
      t.integer :element_id
      t.date :date

      t.timestamps
    end
  end
end
