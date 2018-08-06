Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/stock", to: "portfolios#update"

  resources :portfolios

  namespace :api do
    namespace :v1 do
      resources :stock_holdings, only: [:destroy]
      resources :portfolios, only: [:index, :show, :create]
    end
  end

end
