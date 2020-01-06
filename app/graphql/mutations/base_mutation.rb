module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    null false

    def check_authentication!
      return if context[:current_user]

      raise GraphQL::ExecutionError,
        "You need to sign in to perform this action"
    end
  end
end
