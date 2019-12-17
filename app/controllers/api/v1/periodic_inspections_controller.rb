module Api::V1
  class PeriodicInspectionsController < ApplicationController
    before_action :remove_empty_comments, only: [:create, :update]

    def find_by_date
      @insp = PeriodicInspection.find_or_init_past_inspection(
        date: Date.parse(params[:date]),
        element_id: params[:element_id]
      )

      if @insp.id == nil
        @insp.sections.new(title: "Element")
        @insp.sections.new(title: "Equipment")
        @insp.sections.new(title: "Environment")
      end

      render json: @insp
    end

    def create
      @inspection = PeriodicInspection.new(element_id: params[:element_id])

      return save_and_return(@inspection)
    end

    def update
      @inspection = PeriodicInspection.find(periodic_params[:id])

      return save_and_return(@inspection)
    end

    private

    def save_and_return(inspection)
      current_user = User.find(params["user_id"])

      # if the inspection will change when saved,
      # add the current user to be referenced by 'edited by'
      inspection.assign_attributes(periodic_params)
      if inspection.changed_for_autosave?
        inspection.users << current_user unless inspection.users.include?(current_user)
        if inspection.save
          render json: inspection
        else
          render json: {
            status: 400,
            errors: inspection.errors.messages
          }
        end
      else
        render json: inspection
      end
    end

    def periodic_params
      params.require(:periodic_inspection).permit(
        :id,
        :date,
        :sections_attributes => [
          :id,
          :title,
          :complete,
          :comments_attributes => [
            :user_id,
            :id,
            :content
          ]
        ]
      )
    end
    
    def remove_empty_comments
      params[:periodic_inspection][:sections_attributes].each do |section|
        section[:comments_attributes].delete_if do |comment|
          comment[:content] == ""
        end
      end
    end
  end
end