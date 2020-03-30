Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
