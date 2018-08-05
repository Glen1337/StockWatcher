class StockHoldingSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :cost_basis
  belongs_to :portfolio

end
