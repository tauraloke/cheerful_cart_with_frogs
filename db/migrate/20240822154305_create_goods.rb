# frozen_string_literal: true

# Goods migration class
class CreateGoods < ActiveRecord::Migration[6.1]
  def change
    create_table :goods do |t|
      t.string :title
      t.decimal :price, precision: 8, scale: 2
      t.string :image_path

      t.timestamps
    end
  end
end
