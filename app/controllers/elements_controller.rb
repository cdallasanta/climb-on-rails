class ElementsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_element, only: [:show, :edit, :update]

  def index
    @elements = current_site.elements
  end

  def show
  end

  def edit
    #create two blank ropes so the user can add new ones in the form
    @element.ropes.build
    @element.ropes.build
  end

  def update
    remove_blank_ropes
    @element.update(string_to_html(element_params.except(:ropes_attributes)))
    @element.update(element_params.slice(:ropes_attributes))

    if @element.valid?
      flash[:alert] = "Element saved successfully"
      redirect_to element_path(@element)
    else
      render :edit
    end
  end

  private

  def remove_blank_ropes
    params[:element][:ropes_attributes].delete_if do |rope, details|
      details[:identifier] == ""
    end
  end

  def element_params
    params.require(:element).permit(
      :name,
      :setup_equipment_instructions,
      :setup_element_instructions,
      :setup_envvironment_instructions,
      :takedown_equipment_instructions,
      :takedown_element_instructions,
      :takedown_envvironment_instructions,
      :periodic_equipment_instructions,
      :periodic_element_instructions,
      :periodic_envvironment_instructions,
      ropes_attributes: [
        :identifier,
        :id
      ]
    )
  end

  # user's line breaks come in as "\r\n", but we will later display them using <br>
  def string_to_html(params)
    params.to_h.transform_values do |text|
      text.gsub("\r\n","<br>")
    end
  end

  #mostly preventing url shenanigans
  def get_element
    @element = Element.find_by(id: params[:id])

    unless @element
      flash[:alert] = "Element not found"
      redirect_to elements_path
    end
  end
end
