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
end
