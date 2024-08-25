# frozen_string_literal: true

# Add some new indeces
class AddIndex2Goods2Carts < ActiveRecord::Migration[6.1]
  def change
    add_index :goods2carts, :good_id, if_not_exists: true
    add_index :goods2carts, :cart_id, if_not_exists: true
  end
end
