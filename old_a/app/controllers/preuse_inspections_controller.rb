class PreuseInspectionsController < ApplicationController
  before_action :remove_empty_comments, only: [:create, :update]
  before_action :check_for_element_and_preuse_existance, :authenticate_user!, except: [:find_by_date]

  # /elements/:element_id/preuse_inspections/new
  def new
    params[:date] ? date = params[:date] : date = Date.today.to_s

    @inspection = PreuseInspection.find_or_init_past_inspection(date, @element.id)
    if @inspection.id != nil
      redirect_to edit_element_preuse_inspection_path(@element, @inspection) and return
    end

    @inspection.setup = PreuseInspection::Setup.create unless @inspection.setup
    @inspection.setup.comments.build(user:current_user)

    # TODO The following line, for some reason, makes it so the "Preuse Inspection must exist" error
    # doesn't show up in the form. I don't know why yet
    @inspection.valid?
  end

  # /elements/:element_id/preuse_inspections/:id
  def create
    @inspection = PreuseInspection.find_or_init_past_inspection(preuse_params[:date], @element.id)
    @inspection.assign_attributes(preuse_params)
    #  TODO, this might not be necessary anymore
    #save preuse for date validation, to ensure the date is unique on that element
    unless @inspection.valid?
      link_to_previous_preuse_on_that_date and return
    end

    # updating setup

    # if the inspection will change when saved, add the current user to be referenced by
    # 'edited by', and also reduced the number of calls to the db
    setup = @inspection.setup
    if setup.changed_for_autosave?
      setup.users << current_user unless setup.users.include?(current_user)
    end
    
    @inspection.save
    flash[:alert] = "Inspection logged successfully"

    redirect_to edit_element_preuse_inspection_path(@element, @inspection)
  end

  # from datepicker JS
  # /elements/:element_id/preuse_inspections/date/:date
  def find_by_date
    @inspection = PreuseInspection.find_or_init_past_inspection(params[:date], params[:element_id])
    if @inspection.id != nil
      render js: "window.location = '#{edit_element_preuse_inspection_url(@inspection.element, @inspection)}'"
    else
      render js: "window.location = '#{new_element_preuse_inspection_url(@inspection.element)}?date=#{params[:date]}'"
    end
  end

  # /elements/:element_id/preuse_inspections/:id/edit
  def edit
    @inspection.setup.comments.build(user:current_user)
    if @inspection.setup.is_complete?
      @inspection.takedown ||= PreuseInspection::Takedown.create

      @takedown = @inspection.takedown
      @takedown.comments.build(user:current_user)
      if @takedown.climbs == []
        @takedown.ropes.each do |rope|
          @takedown.climbs.create(rope:rope)
        end
      end
    end
  end

  def update
    #updating preuse (just the date, really)
    @inspection.assign_attributes(preuse_params)
    # TODO this might also note be necessary
    #save preuse for date validation, to ensure the date is unique on that element
    unless @inspection.valid?
      link_to_previous_preuse_on_that_date and return
    end

    #updating setup
    setup = @inspection.setup
    
    # if the inspection will change when saved, add the current user to be referenced by
    # 'edited by', and also reduced the number of calls to the db
    if setup.changed_for_autosave?
      setup.users << current_user unless setup.users.include?(current_user)
    end

    #updating takedown
    if preuse_params[:takedown_attributes]
      takedown = @inspection.takedown

      # if the inspection will change when saved, add the current user to be referenced by
      # 'edited by', and also reduced the number of calls to the db
      if takedown.changed_for_autosave?
        takedown.users << current_user unless takedown.users.include?(current_user)
      end
    end

    @inspection.save
    flash[:alert] = "Inspection logged successfully"

    # sent to edit instead of show, since it is more likely that
    # they will do more changes soon
    redirect_to edit_element_preuse_inspection_path(@inspection.element, @inspection)
  end

  private

  def preuse_params
    # TODO this is hitting an error even when not called, which makes me think something's wrong somewhere else
    # adding in the `if` statment for now as a workaround
    if params[:preuse_inspection]
      params[:preuse_inspection].permit(
        :date,
        setup_attributes: [
          :equipment_complete,
          :element_complete,
          :environment_complete,
          :id,
          comments_attributes: [
            :user_id,
            :content,
            :id
          ]
        ],
        takedown_attributes: [
          :equipment_complete,
          :element_complete,
          :environment_complete,
          :id,
          ropes_attributes: [
            :id
          ],
          comments_attributes: [
            :user_id,
            :content,
            :id
          ],
          climbs_attributes: [
            :block_1,
            :block_2,
            :block_3,
            :block_4,
            :id
          ]
        ]
      )
    end
  end

  # preventing url shenanigans
  def check_for_element_and_preuse_existance
    @element = Element.find_by(id:params[:element_id])
    if @element
      if params[:id]
        @inspection = @element.preuse_inspections.find_by(id: params[:id])
        if @inspection.nil?
          flash[:alert] = "Inspection id not found under that element"
          redirect_to element_path(@element)
        end
        # TODO is this necessary?
      # else
      #   @inspection = @element.preuse_inspections.create()
      end
    else
      flash[:alert] = "No element found with that id"
      redirect_to root_path
    end
  end

  # called if they try to save an inspection for a date that already has
  # an inspection logged
  # TODO: this might be unnecessary now
  def link_to_previous_preuse_on_that_date
    previous_inspection = PreuseInspection.find_or_init_past_inspection(params[:preuse_inspection][:date], @element.id)
    if previous_inspection
      flash[:alert] = "There is already an inspection logged for that date. View/edit it <a href='#{edit_element_preuse_inspection_path(@element, previous_inspection)}'>here</a>"
      redirect_to edit_element_preuse_inspection_path(@element, @inspection)
    end
  end

  def remove_empty_comments
    params[:preuse_inspection][:setup_attributes][:comments_attributes].delete_if do |num, comment|
      comment[:content] == ""
    end

    if params[:preuse_inspection][:takedown_attributes]
      params[:preuse_inspection][:takedown_attributes][:comments_attributes].delete_if do |num, comment|
        comment[:content] == ""
      end
    end
  end
end
