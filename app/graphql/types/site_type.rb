module Types
  class SiteType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :elements, [ElementType], null: true
    field :contact, UserType, null: true
    field :status, String, null: true do
      argument :date, String, required: false
    end

    # TODO clean this up
    def status(**args)
      args[:date] ? date = args[:date] : date = Date.today
      agg = {}
      object.elements.each do |elem|
        insp = elem.preuse_inspections.find_by(date: date)
        if insp
          status = {id: elem.id, setup: insp.setup.status}
          if insp.takedown
            status[:takedown] = insp.takedown.status
          else
            status[:takedown] = "not started"
          end
        else
          status = {
            id: elem.id,
            setup: "not started",
            takedown: "not started"
          }
        end

        agg[elem.name] = status
      end

      agg
    end
  end
end
