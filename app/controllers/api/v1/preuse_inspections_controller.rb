module Api::V1
  class PreuseInspectionsController < ApplicationController
    before_action :remove_empty_comments, only: [:create, :update]

    def find_by_date
      @insp = PreuseInspection.find_or_init_past_inspection(
        date: Date.parse(params[:date]),
        element_id: params[:element_id]
      )
      
      if @insp.id == nil
        @insp.setup = PreuseInspection::Setup.new
      end

      render json: @insp
    end

    def create
      @insp = PreuseInspection.new(element_id: params[:element_id])

      return save_and_return
    end

    def update
      @insp = PreuseInspection.find(preuse_params[:id])

      return save_and_return
    end

    private

    def save_and_return
      current_user = User.find(params["user_id"])

      # assign attributes - needed to do this weird nesting thing since AR couldn't find
      # the nested sections in the setup and takedown if they already existed
      @insp.date = preuse_params[:date]
      if @insp.setup
        @insp.setup.assign_attributes(preuse_params[:setup_attributes])
      else
        @insp.assign_attributes(preuse_params)
      end
      if @insp.takedown
        @insp.takedown.assign_attributes(preuse_params[:takedown_attributes])
      end

      # add current user to setup and takedown's "updated by"
      if @insp.setup.changed_for_autosave?
        @insp.setup.users << current_user unless @insp.setup.users.include?(current_user)
      end
      if @insp.takedown&.changed_for_autosave?
        @insp.takedown.users << current_user unless @insp.takedown.users.include?(current_user)
      end
      
      # save and create takedown or return errors
      if @insp.changed_for_autosave?
        if @insp.save
          if @insp.setup.is_complete? && !@insp.takedown
            @insp.takedown = PreuseInspection::Takedown.create()
          end
          render json: @insp
        else
          render json: {
            status: 400,
            errors: @insp.errors.messages
          }
        end
      else
        render json: @insp
      end
    end

    def preuse_params
      params.require(:preuse_inspection).permit(
        :id,
        :date,
        setup_attributes: [
          :id,
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
        ],
        takedown_attributes: [
          :id,
          :sections_attributes => [
            :id,
            :title,
            :complete,
            :comments_attributes => [
              :user_id,
              :id,
              :content
            ]
          ],
          :ropes_attributes => [
            :id,
            :climbs_attributes => [
              :id,
              :block_1,
              :block_2,
              :block_3,
              :block_4
            ]
          ]
        ]
      )
    end
    
    def remove_empty_comments
      params[:preuse_inspection][:setup_attributes][:sections_attributes].each do |section|
        section[:comments_attributes].delete_if do |comment|
          comment[:content] == ""
        end
      end

      if params[:preuse_inspection][:takedown_attributes]
        params[:preuse_inspection][:takedown_attributes][:sections_attributes].each do |section|
          section[:comments_attributes].delete_if do |comment|
            comment[:content] == ""
          end
        end
      end
    end
  end
end