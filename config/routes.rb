Rails.application.routes.draw do
  root to: 'visitors#index'
  match 'kickup', to: 'visitors#kickup', via: [:get]
  match 'support', to: 'visitors#support', via: [:get]
  
  resources :stamps do
  	collection do 
  		get 'download'
  	end
  end
end
