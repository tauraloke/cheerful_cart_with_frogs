# frozen_string_literal: true

# Cart migration class
class CreateCarts < ActiveRecord::Migration[6.1]
  def change
    create_table :carts do |t|
      t.decimal :total_price, precision: 8, scale: 2
      t.decimal :discount, precision: 8, scale: 2
      t.integer :status

      t.timestamps
    end
  end
end
