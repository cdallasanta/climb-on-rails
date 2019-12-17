class CommentsController < ApplicationController
  # TODO is this needed?
  def index
    @comments = current_site.recent_comments
  end
end
