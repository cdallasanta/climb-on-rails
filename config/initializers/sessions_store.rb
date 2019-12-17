if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_climb-on', domain: 'climb-on.org'
else
  Rails.application.config.session_store :cookie_store, key: '_climb-on' 
end