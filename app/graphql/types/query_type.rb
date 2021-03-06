class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :site, Types::SiteType, null: false do
    description "Find a particular site"
  end
  def site
    check_authentication!
    context[:current_user].site
  end

  field :elements, [Types::ElementType], null: true do
    description "Find elements from a particular site"
  end
  def elements
    check_authentication!
    context[:current_user].site.elements
  end

  field :element, Types::ElementType, null: true do
    description "Find a single element"
    argument :id, Integer, required: true
  end
  def element(id:)
    check_authentication!
    Element.find(id)
  end
end
