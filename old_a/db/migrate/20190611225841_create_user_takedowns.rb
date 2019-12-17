class CreateUserTakedowns < ActiveRecord::Migration[5.2]
  def change
    create_table :user_takedowns do |t|
      t.integer :user_id
      t.integer :takedown_id
    end
  end
end
