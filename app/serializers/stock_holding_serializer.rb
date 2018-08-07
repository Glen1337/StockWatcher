class StockHoldingSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :cost_basis, :notes
  belongs_to :portfolio

end
