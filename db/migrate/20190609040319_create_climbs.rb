class CreateClimbs < ActiveRecord::Migration[5.2]
  def change
    create_table :climbs do |t|
      t.integer :rope_id
      t.integer :takedown_id
      t.integer :block_1
      t.integer :block_2
      t.integer :block_3
      t.integer :block_4
    end
  end
end
