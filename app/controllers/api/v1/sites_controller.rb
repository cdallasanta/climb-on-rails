module Api::V1
  class SitesController < ApplicationController
    def show
      render json: Site.find(params[:id])
    end

    def status
      params[:date] ? date = params[:date] : date = Date.today
      @site = Site.find(params[:site_id])
      agg = {}
      @site.elements.each do |elem|
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

      render json: agg
    end
  end
end