# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  Rails.application.routes.draw do
    scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
      # rest of your routes here
      # for example:
      get '/', to: redirect('/cart')
      get '/cart', to: 'carts#show'
      get '/cart/clear', to: 'carts#clear'
      patch '/api/v1/goods2cart/:id', to: 'api/v1/goods2carts#update'
      delete '/api/v1/goods2cart/:id', to: 'api/v1/goods2carts#delete'
    end
  end
end
