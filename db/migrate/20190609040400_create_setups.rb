class CreateSetups < ActiveRecord::Migration[5.2]
  def change
    create_table :setups do |t|
      t.integer :preuse_inspection_id
      t.integer :user_id

      t.timestamps
    end
  end
end
