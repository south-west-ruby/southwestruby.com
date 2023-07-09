Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show"

  root "static#home"
end
