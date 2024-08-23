# frozen_string_literal: true

module Api
  # Version module
  module V1
    # Controller class for user carts
    class CartsController < ApplicationController
      def clear
        Cart.find(current_cart_id).clear!

        render json: { status: 'OK', cart_id: current_cart_id }
      end
    end

    private

    def current_cart_id
      return @current_cart_id if defined? @current_cart_id

      @current_cart_id ||= Cart.first.id
    end
  end
end
