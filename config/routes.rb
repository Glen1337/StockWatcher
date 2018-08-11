Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/about", to: "homes#show"
  # get "/about", to: ""
  # get "/portfolios", to: "portfolios#index"
  resources :homes, only: [:index]
  resources :stock_holdings, only: [:index]
  resources :portfolios, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :stock_holdings, only: [:destroy, :create]
      resources :portfolios, only: [:index, :show, :create, :destroy]
    end
  end

end
