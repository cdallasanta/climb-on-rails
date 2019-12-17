class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :role
      t.integer :site_id
      t.string :fullname
      t.string :password_digest
      t.string :email
    end
  end
end
