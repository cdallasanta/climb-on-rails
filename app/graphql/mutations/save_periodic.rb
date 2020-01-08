module Mutations
  class SavePeriodic < BaseMutation
    argument :data, Inputs::PeriodicInput, required: true

    field :status, String, null: false
    field :errors, [String], null: true

    def resolve(**args)
      binding.pry
      # @params = eval(args[:payload])
      
      # if args[:id]
      #   @inspection = PeriodicInspection.find(args[:id])
      # else
      #   @inspection = PeriodicInspection.new(element_id: @params[:element_id])
      # end
      # return save_and_return
    end

    private

    def save_and_return
      remove_empty_comments
      current_user = context[:current_user]

      # if the inspection will change when saved,
      # add the current user to be referenced by 'edited by'
      @inspection.assign_attributes(params)
      if @inspection.changed_for_autosave?
        @inspection.users << current_user unless @inspection.users.include?(current_user)
        if @inspection.save
          render json: {
            status: 200
          }
        else
          render json: {
            status: 400,
            errors: @inspection.errors.messages
          }
        end
      else
        render json: {
          status: 204
        }
      end
    end

    def periodic_params
      @params.assert_valid_keys(
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
      @params[:sections_attributes].each do |section|
        section[:comments_attributes].delete_if do |comment|
          comment[:content] == ""
        end
      end
    end
  end
end