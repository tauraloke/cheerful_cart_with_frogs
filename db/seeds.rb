# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

good1 = Good.create! title: 'Беспроводная колонка Goodyear Bluetooth Speaker', price: 1600
good2 = Good.create! title: 'Женский домашний костюм Sweet Dreams', price: 800
good3 = Good.create! title: 'Плащ-дождевик SwissOak', price: 800
cart = Cart.create! total_price: 3000, discount: 1000, status: :pending
Goods2cart.create! [
  { cart_id: cart.id, good_id: good1.id, amount: 1 },
  { cart_id: cart.id, good_id: good2.id, amount: 1 },
  { cart_id: cart.id, good_id: good3.id, amount: 2 }
]
