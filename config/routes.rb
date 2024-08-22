# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/', to: redirect('/cart')
  get '/cart', to: 'carts#show'
  get 'cart/restore', to: 'carts#restore'
  patch '/api/v1/goods2cart/:id', to: 'api/v1/goods2carts#update'
  delete '/api/v1/goods2cart/:id', to: 'api/v1/goods2carts#delete'
  delete 'api/v1/cart', to: 'api/v1/carts#delete'
end
