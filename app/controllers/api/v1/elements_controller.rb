module Api::V1
  class ElementsController < ApplicationController
    before_action :set_list, only: [:show, :update, :destroy]
  
    def index
      @elements = Element.where(site_id: params[:site_id])
      render json: @elements
    end
  
  end
end