module Mutations
  class SignOutUser < BaseMutation
    field :status, Integer, null: false
    field :logged_out, Boolean, null: false

    def resolve
      context[:session].clear
      return {
        status: 200,
        logged_out: true
      }
    end
  end
end