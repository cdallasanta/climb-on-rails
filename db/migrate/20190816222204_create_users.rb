class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :role
      t.integer :site_id
      t.string :fullname
    end
  end
end
