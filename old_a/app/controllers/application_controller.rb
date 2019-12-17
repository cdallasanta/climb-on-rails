class ApplicationController < ActionController::Base

  # Helpers

  # The following are defined by Devise:
  # user_signed_in?
  # current_user
  # user_session
  # destroy_user_session_path (Logout)
  # new_user_session_path (Login)
  # edit_user_registration_path (Edit registration)
  # new_user_registration_path (Register new user)

  def current_site
    current_user.site
  end

  def authenticate_admin_user
    if !user_signed_in?
      redirect_to new_user_session_path
    elsif !current_user.is_admin?
      redirect_to root_path
    end
  end
end
