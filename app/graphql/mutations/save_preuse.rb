module Mutations
  class SavePreuse < BaseMutation
    argument :data, Inputs::PreuseInput, required: true

    field :status, String, null: false
    field :errors, [String], null: true
    field :preuseInspection, Types::PreuseInspectionType, null: true

    def resolve(**args)
      check_authentication!
      binding.pry
      @params = args[:data].to_h
      
      if @params["id"]
        @inspection = PreuseInspection.find(@params["id"])
      else
        @inspection = PreuseInspection.new(element_id: @params["element_id"])
      end
      save_and_return
    end

    private

    def save_and_return
      check_authentication!
      
      remove_empty_comments
      current_user = context[:current_user]

      # assign attributes - needed to do this weird nesting thing since AR couldn't find
      # the nested sections in the setup and takedown if they already existed
      @inspection.assign_attributes(@params)

      # add current user to setup and takedown's "updated by"
      if @inspection.setup.changed_for_autosave?
        @inspection.setup.users << current_user unless @inspection.setup.users.include?(current_user)
      end
      if @inspection.takedown.changed_for_autosave?
        @inspection.takedown.users << current_user unless @inspection.takedown.users.include?(current_user)
      end
      
      # save and create takedown or return errors
      if @inspection.changed_for_autosave?
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
      @params["setup_attributes"]["sections_attributes"].each do |section|
        section["comments_attributes"].delete_if do |comment|
          comment["content"] == ""
        end
        section["comments_attributes"].each do |comment|
          if comment[:user_id] == nil
            comment[:user_id] = context[:current_user].id
          end
        end
      end

      @params["takedown_attributes"]["sections_attributes"].each do |section|
        section["comments_attributes"].delete_if do |comment|
          comment["content"] == ""
        end
        section["comments_attributes"].each do |comment|
          if comment[:user_id] == nil
            comment[:user_id] = context[:current_user].id
          end
        end
      end
    end
  end
end