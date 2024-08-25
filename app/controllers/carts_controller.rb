# frozen_string_literal: true

# Class for the bunch of cart routes
class CartsController < ApplicationController
  # rubocop:disable Metrics/AbcSize
  def show
    @cart               = Cart.find(current_cart_id)
    @cart_rows          = @cart.goods2carts.includes(:good)
    @cart_rows_count    = @cart_rows.count
    @total_count        = @cart.total_count
    @total_sum          = @cart.total_sum
    @total_count        = @total_sum = 0 if @cart_rows.count.zero?
    @discount           = [@total_sum, @cart.discount].min
    @discount_const_max = 1000
    @discount_max       = [@total_sum, @discount_const_max].min
    @final_price        = @total_sum - @discount
  end
  # rubocop:enable Metrics/AbcSize

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
