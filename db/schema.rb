# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_03_211432) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "climbs", force: :cascade do |t|
    t.integer "rope_id"
    t.integer "takedown_id"
    t.integer "block_1"
    t.integer "block_2"
    t.integer "block_3"
    t.integer "block_4"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.integer "user_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
  end

  create_table "elements", force: :cascade do |t|
    t.string "name"
    t.integer "site_id"
    t.text "setup_equipment_instructions"
    t.text "setup_element_instructions"
    t.text "setup_environment_instructions"
    t.text "takedown_equipment_instructions"
    t.text "takedown_element_instructions"
    t.text "takedown_environment_instructions"
    t.text "periodic_equipment_instructions"
    t.text "periodic_element_instructions"
    t.text "periodic_environment_instructions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "periodic_inspections", force: :cascade do |t|
    t.integer "element_id"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "preuse_inspections", force: :cascade do |t|
    t.integer "element_id"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ropes", force: :cascade do |t|
    t.string "identifier"
    t.integer "element_id"
    t.boolean "retired"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sections", force: :cascade do |t|
    t.string "title"
    t.boolean "complete"
    t.string "inspection_type"
    t.bigint "inspection_id"
    t.index ["inspection_type", "inspection_id"], name: "index_sections_on_inspection_type_and_inspection_id"
  end

  create_table "setups", force: :cascade do |t|
    t.integer "preuse_inspection_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sites", force: :cascade do |t|
    t.string "name"
    t.integer "contact_id"
  end

  create_table "takedowns", force: :cascade do |t|
    t.integer "preuse_inspection_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_periodic_inspections", force: :cascade do |t|
    t.integer "user_id"
    t.integer "periodic_inspection_id"
  end

  create_table "user_setups", force: :cascade do |t|
    t.integer "user_id"
    t.integer "setup_id"
  end

  create_table "user_takedowns", force: :cascade do |t|
    t.integer "user_id"
    t.integer "takedown_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "role"
    t.integer "site_id"
    t.string "fullname"
    t.string "password_digest"
    t.string "email"
  end

end
