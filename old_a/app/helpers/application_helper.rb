module ApplicationHelper
  def current_site
    current_user.site
  end

  # adds form errors to the top of the form
  def errors_check(object)
    if object.errors.any?
      render partial: 'application/errors', locals: {object: object}, class: "alert alert-error fields_with_errors"
    end
  end

  def javascript_exists?
    script = "#{Rails.root}/app/assets/javascripts/#{params[:controller]}.js"
    File.exists?(script) || File.exists?("#{script}.coffee") 
  end

  def stylesheet_exists?
    script = "#{Rails.root}/app/assets/stylesheets/#{params[:controller]}.scss"
    File.exists?(script) || File.exists?("#{script}.erb") 
  end
end
