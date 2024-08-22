# frozen_string_literal: true

# Class for the bunch of cart routes
class CartsController < ApplicationController
  DEFAULT_USER_ID = 1

  def show
    # TODO: извлечь данные для рендера корзины
    @cart = Cart.get(current_user_id)
  end

  def restore
    # TODO: восстановить корзину по умолчанию
    redirect action: 'show'
  end

  private

  def current_user_id
    DEFAULT_USER_ID
  end
end
