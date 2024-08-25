# frozen_string_literal: true

# Cart model class
class Cart < ApplicationRecord
  has_many :goods2carts, dependent: :delete_all

  enum status: {
    pending: 0,
    ordered: 1,
    done: 2,
    rejected: 3
  }

  def clear!
    goods2carts.destroy_all
  end

  def total_sum
    goods2carts.includes(:good)
               .group(:cart_id)
               .sum('goods2carts.amount * goods.price')[id]
  end

  def total_count
    goods2carts.group(:cart_id).pick('SUM(amount) AS total_count')
  end
end
