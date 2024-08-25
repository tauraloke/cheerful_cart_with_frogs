# frozen_string_literal: true

# Class for the bunch of cart routes
class CartsController < ApplicationController
  def show
    @cart            = Cart.find(current_cart_id)
    @cart_rows       = @cart.goods2carts.includes(:good)
    @cart_rows_count = @cart_rows.count
    @total_count     = @cart_rows.count > 0 ? @cart.total_count : 0
    @total_sum       = @cart_rows.count > 0 ? @cart.total_sum : 0
    @final_price     = @total_sum - @cart.discount
  end

  def clear
    Cart.find(current_cart_id).clear!

    redirect_to '/cart'
  end

  private

  def current_cart_id
    return @current_cart_id if defined? @current_cart_id

    @current_cart_id ||= Cart.first.id
  end
end
