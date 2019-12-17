ActiveAdmin.register User do
  scope_to unless: proc{ current_user.fullname == "Chris Dalla Santa" } do
    current_user.site
  end
  permit_params :fullname, :email, :role
  config.sort_order = 'fullname_asc'
  config.per_page = [10, 50, 100]

  index do
    selectable_column
    column "Name", :fullname
    column :email
    column :role
    actions
  end

  filter :fullname, label: "Name"
  filter :email
  filter :role

  form do |f|
    f.inputs do
      f.input :email
      f.input :role, as: :select, collection: ["facilitator", "lead", "admin"]
    end
    f.actions
  end
  
  show title: :fullname do
    attributes_table do
      row('Name'){ |r| r.fullname }
      row :email
      row :role
    end
  end
end
