module Api::V1
  class SitesController < ApplicationController
    def show
      render json: Site.find(params[:id])
    end
  end
end