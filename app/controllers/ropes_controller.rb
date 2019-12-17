class RopesController < ApplicationController
  before_action :check_for_element_and_rope_existance, :authenticate_user!

  def update
    @rope.update(retired: true)
    redirect_to new_element_rope_path(@element, @rope)
  end

  def new
    @rope = Element::Rope.new(element: @element)
  end

  def create
    Element::Rope.create(rope_params)
    redirect_to element_path(@element)
  end

  private

  def rope_params
    params.require(:element_rope).permit(:identifier, :element_id)
  end

  # preventing url shenanigans
  def check_for_element_and_rope_existance
    @element = Element.find_by(id:params[:element_id])
    if @element
      if params[:id]
        @rope = @element.ropes.find_by(id: params[:id])
        if @rope.nil?
          flash[:alert] = "Rope id not found under that element"
          redirect_to element_path(@element)
        end
      end
    else
      flash[:alert] = "No element found with that id"
      redirect_to root_path
    end
  end
end
