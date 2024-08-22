class Cart < ApplicationRecord
  enum status: {
    pending: 0,
    ordered: 1,
    done: 2,
    rejected: 3
  }
end
