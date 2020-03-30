module Mutations
  class SavePeriodic < Mutations::BaseMutation
    argument :data, Inputs::PeriodicInput, required: true

    field :status, String, null: false
    field :errors, [String], null: true
    field :periodicInspection, Types::PeriodicInspectionType, null: true

    def resolve(**args)
      @params = args[:data].to_h
      
      if @params[:id]
        @inspection = PeriodicInspection.find(@params[:id])
      else
        @inspection = PeriodicInspection.new(element_id: @params[:element_id])
      end
      save_and_return
    end

    private

    def save_and_return
      check_authentication!
      
      remove_empty_comments
      current_user = context[:current_user]

      # TODO there has to be a better way to deal with :after_initialize and it's relics
      if @inspection.id.nil?
        @inspection.sections = []
      end
      
      # if the inspection will change when saved,
      # add the current user to be referenced by 'edited by'
      @inspection.assign_attributes(@params)
      if @inspection.changed_for_autosave?
        @inspection.users << current_user unless @inspection.users.include?(current_user)
        if @inspection.save
          return {
            status: 200,
            periodic_inspection: @inspection
          }
        else
          return {
            status: 400,
            errors: @inspection.errors.messages
          }
        end
      else
        return {
          status: 204
        }
      end
    end
    
    def remove_empty_comments
      @params[:sections_attributes].each do |section|
        section[:comments_attributes].delete_if do |comment|
          comment[:content] == ""
        end
        section[:comments_attributes].each do |comment|
          if comment[:user_id] == nil
            comment[:user_id] = context[:current_user].id
          end
        end
      end
    end
  end
end