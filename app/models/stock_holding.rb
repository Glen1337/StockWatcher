class StockHolding < ApplicationRecord
  belongs_to :portfolio
  validates :ticker,uniqueness: true, presence: true, length: {in: 1..5}
  validates :cost_basis, presence: true, numericality: { greater_than: 0, less_than: 310000 }
  validates :quantity, presence: true, numericality: true, inclusion: {in: 1..10000}
end
