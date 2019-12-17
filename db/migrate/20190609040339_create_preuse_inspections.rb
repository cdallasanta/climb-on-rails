class CreatePreuseInspections < ActiveRecord::Migration[5.2]
  def change
    create_table :preuse_inspections do |t|
      t.integer :element_id
      t.date :date

      t.timestamps
    end
  end
end
