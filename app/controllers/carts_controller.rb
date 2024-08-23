# frozen_string_literal: true

# Class for the bunch of cart routes
class CartsController < ApplicationController
  DEFAULT_CART_ID = 1

  def show
    @cart = Cart.get(current_cart_id)
    @cart_rows = @cart.goods2carts.includes(:good)
  end

  private

  def current_cart_id
    DEFAULT_CART_ID
  end
end
