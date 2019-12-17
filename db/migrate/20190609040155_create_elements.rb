class CreateElements < ActiveRecord::Migration[5.2]
  def change
    create_table :elements do |t|
      t.string :name
      t.integer :site_id
      t.text :setup_equipment_instructions
      t.text :setup_element_instructions
      t.text :setup_environment_instructions
      t.text :takedown_equipment_instructions
      t.text :takedown_element_instructions
      t.text :takedown_environment_instructions
      t.text :periodic_equipment_instructions
      t.text :periodic_element_instructions
      t.text :periodic_environment_instructions

      t.timestamps
    end
  end
end
