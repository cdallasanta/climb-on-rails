class CreateRopes < ActiveRecord::Migration[5.2]
  def change
    create_table :ropes do |t|
      t.string :identifier
      t.integer :element_id
      t.boolean :retired

      t.timestamps
    end
  end
end
