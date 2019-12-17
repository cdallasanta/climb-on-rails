module CommentsHelper
  def element_and_comments
    current_site.elements.each do |elem|
      comm_arr = @comments.select { |c| c.commentable.element == elem }
      if !comm_arr.empty? 
        yield(elem, comm_arr)
      end
    end
  end
end
