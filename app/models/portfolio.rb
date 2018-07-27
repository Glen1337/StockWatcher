class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :stock_holdings
  validates :name, presence: true, uniqueness: true
end
