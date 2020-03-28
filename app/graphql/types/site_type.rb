module Types
  class SiteType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :elements, [ElementType], null: true
    field :contact, UserType, null: true
    field :status, [StatusType], null: true do
      argument :date, String, required: false
    end

    def status(**args)
      args[:date] ? date = args[:date] : date = Date.today
      elementsStatus = []
      object.elements.each do |elem|
        status = {name: elem.name, id: elem.id}
        insp = elem.preuse_inspections.find_by(date: date)
        if insp
          status[:setup] = insp.setup.status
          if insp.takedown
            status[:takedown] = insp.takedown.status
          else
            status[:takedown] = "not started"
          end
        else
          status = {
            **status,
            setup: "not started",
            takedown: "not started"
          }
        end

        elementsStatus << status
      end

      elementsStatus
    end
  end
end
