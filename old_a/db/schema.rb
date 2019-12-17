# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_30_193251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

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
    t.boolean "equipment_complete"
    t.boolean "element_complete"
    t.boolean "environment_complete"
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

  create_table "setups", force: :cascade do |t|
    t.boolean "equipment_complete"
    t.boolean "element_complete"
    t.boolean "environment_complete"
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
    t.boolean "equipment_complete"
    t.boolean "element_complete"
    t.boolean "environment_complete"
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
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
