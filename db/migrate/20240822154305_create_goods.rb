class CreateGoods < ActiveRecord::Migration[6.1]
  def change
    create_table :goods do |t|
      t.string :title
      t.decimal :price, precision: 7, scale: 2

      t.timestamps
    end
  end
end
