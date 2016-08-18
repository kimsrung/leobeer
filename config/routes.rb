Rails.application.routes.draw do
  root to: 'visitors#index'
  match 'kickup', to: 'visitors#kickup', via: [:get]
  match 'support', to: 'visitors#support', via: [:get]

  match 'auth/:provider/callback', to: 'sessions#create', via: [:get]
  match 'auth/failure', to: redirect('/') ,via: [:get]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:post]
  
  resources :stamps do
  	collection do 
  		get 'download'
  	end
  end
end
