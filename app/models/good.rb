# frozen_string_literal: true

# Goods model class
class Good < ApplicationRecord
  has_many :goods2carts, dependent: :delete_all
end
