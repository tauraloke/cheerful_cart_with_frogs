# frozen_string_literal: true

# Many2Many cart/good migration class
class CreateGoods2carts < ActiveRecord::Migration[6.1]
  def change
    create_table :goods2carts do |t|
      t.integer :good_id
      t.integer :cart_id
      t.integer :amount

      t.timestamps
    end
  end
end
