# frozen_string_literal: true

# Many2many aux model class
class Goods2cart < ApplicationRecord
  belongs_to :good
  belongs_to :cart
end
