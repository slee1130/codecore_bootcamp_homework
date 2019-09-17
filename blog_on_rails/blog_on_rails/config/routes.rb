Rails.application.routes.draw do
    root to:'posts#index'

resources :posts do
    resources :comments, only: [:create, :destroy]
end

resources :users, only: [:new, :create, :edit, :update, :show]

resource :session, only: [:new, :create, :destroy]

  get '/users/:id/password', { to: "users#password", as: 'password' }
  patch '/users/:id/password', { to: "users#password_update", as: 'password_update' }

end


