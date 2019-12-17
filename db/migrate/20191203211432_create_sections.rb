class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.string :title
      t.boolean :complete
      t.references :inspection, polymorphic: true, index: true
    end
  end
end
