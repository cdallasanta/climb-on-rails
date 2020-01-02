module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :site, SiteType, null: false do
      description "Find a particular site"
      argument :id, Integer, required: true
    end
    def site(id:)
      Site.find(id)
    end
  end
end
