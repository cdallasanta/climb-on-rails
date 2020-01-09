module Types
  class ElementType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :setup_equipment_instructions, String, null: true
    field :setup_element_instructions, String, null: true
    field :setup_environment_instructions, String, null: true
    field :takedown_equipment_instructions, String, null: true
    field :takedown_element_instructions, String, null: true
    field :takedown_environment_instructions, String, null: true
    field :periodic_equipment_instructions, String, null: true
    field :periodic_element_instructions, String, null: true
    field :periodic_environment_instructions, String, null: true
    field :periodic_inspection, PeriodicInspectionType, null: true do
      description "Find a periodic inspection based on a date"
      argument :date, String, default_value: Date.today, required: true
    end
    field :preuse_inspection, PreuseInspectionType, null: true do
      description "Find a preuse inspection based on a date"
      argument :date, String, default_value: Date.today, required: true
    end

    def periodic_inspection(**args)
      args[:date] ? date = args[:date] : date = Date.today
      insp = object.periodic_inspections.find_by(date: args[:date])

      return PeriodicInspection.new(element_id: object.id, date: date) unless insp
      return insp
    end
    
    def preuse_inspection(**args)
      args[:date] ? date = args[:date] : date = Date.today
      insp = object.preuse_inspections.find_by(date: args[:date])

      return PreuseInspection.new(element_id: object.id, date: date) unless insp
      return insp
    end
  end
end
