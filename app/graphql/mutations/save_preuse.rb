module Mutations
  class SavePreuse < BaseMutation
    argument :data, Inputs::PreuseInput, required: true

    field :status, String, null: false
    field :errors, [String], null: true
    field :preuseInspection, Types::PreuseInspectionType, null: true

    def resolve(**args)
      check_authentication!
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
      remove_empty_comments
      current_user = context[:current_user]

      # TODO there has to be a better way to deal with :after_initialize and it's relics
      if @inspection.id == nil
        @inspection.setup.sections = []
        @params = @params.except("takedown_attributes")
      end

      binding.pry
      @inspection.assign_attributes(@params)
      
      # save and create takedown or return errors
      if @inspection.changed_for_autosave?
        # add current user to setup and takedown's "updated by"
        if @inspection.setup.changed_for_autosave?
          @inspection.setup.users << current_user unless @inspection.setup.users.include?(current_user)
        end
        if @inspection.takedown&.changed_for_autosave?
          @inspection.takedown.users << current_user unless @inspection.takedown.users.include?(current_user)
        end

        if @inspection.save
          if @inspection.setup.is_complete? && @inspection.takedown == nil
            @inspection.takedown = PreuseInspection::Takedown.create(preuse_inspection: @inspection)
            @inspection.element.ropes.each do |rope|
              @inspection.takedown.climbs.new(rope:rope)
            end
            @inspection.takedown.save
          end
          return {
            status: 200,
            preuse_inspection: @inspection
          }
        else
          return {
            status: 400,
            errors: @inspection.errors.messages
          }
        end
      else
        return {
          status: 204,
          errors: ["No changes detected, inspection not saved."]
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

      if (@params["takedown_attributes"])
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
end