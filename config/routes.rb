Rails.application.routes.draw do
  root to: 'visitors#index'
  match 'kickup', to: 'visitors#kickup', via: [:get]
  match 'support', to: 'visitors#support', via: [:get]
end
