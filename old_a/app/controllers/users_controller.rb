class UsersController < ApplicationController
  before_action :check_owner_of_user, only: [:show, :edit, :update]
  before_action :authenticate_user!, only: [:show, :edit, :update]

  def show
    # @user is set in the before_action, #check_owner_of_user
    render "users/show"
  end

  def update
    if params[:user][:password] != params[:user][:password_confirmation]
      flash[:alert] = "Passwords must match"
      render :edit and return
    end
    # if they left the password field blank, don't change their password
    params[:user].delete_if {|k,v| v == ""}

    if @user.update(user_params)
      flash[:alert] = "Details saved successfully"
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:fullname, :email, :password, :site_id, :role)
  end

  def check_owner_of_user
    @user = User.find_by(id: params[:id])

    unless @user == current_user || current_user.is_admin?
      flash[:alert] = "You must be logged in as that user to view their page"
      redirect_to root_path
    end
  end
end
