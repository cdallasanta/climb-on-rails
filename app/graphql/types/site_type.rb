class Types::SiteType < Types::BaseObject
  field :id, Integer, null: false
  field :name, String, null: false
  field :elements, [Types::ElementType], null: true
  field :contact, Types::UserType, null: true
  field :time, String, null: false
  field :status, [Types::StatusType], null: true do
    argument :date, String, required: false
  end

  def time
    Time.now.strftime("%l:%M%P")
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
    
    # elementsStatus["time"] = DateTime.now
    elementsStatus
  end
end
