module Types
  class BaseObject < GraphQL::Schema::Object
    field_class Types::BaseField

    def check_authentication!
      return if context[:current_user]

      raise GraphQL::ExecutionError,
        "You need to sign in to perform this action"
    end
  end
end
