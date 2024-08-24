# frozen_string_literal: true

# Class for the bunch of cart routes
class CartsController < ApplicationController
  def show
    @cart            = Cart.find(current_cart_id)
    @cart_rows       = @cart.goods2carts.includes(:good)
    @cart_rows_count = @cart_rows.count
    @total_count     = @cart.goods2carts.group(:cart_id).pick('SUM(amount) AS total_count')
    @total_sum       = @cart.goods2carts
                            .includes(:good)
                            .group(:cart_id)
                            .sum('goods2carts.amount * goods.price')[@cart.id]
    @final_price     = @total_sum - @cart.discount
  end

  private

  def current_cart_id
    return @current_cart_id if defined? @current_cart_id

    @current_cart_id ||= Cart.first.id
  end
end
