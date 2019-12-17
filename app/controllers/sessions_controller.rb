class SessionsController < ApplicationController
  # POST /login
  def create
    @user = User.find_by(email: session_params[:email])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: @user
    else
      render json: {
        status: 401,
        errors: ["Email and password did not match a user on file. Please try again."]
      }
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }
    end
  end

  # DELETE /logout
  def destroy
    logout!
    render json: {
      status: 200,
      logged_out: true
    }
  end

  private

  def session_params
    params.require(:user).permit(
      :email,
      :password
    )
  end
end