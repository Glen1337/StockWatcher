class StockHoldingSerializer < ActiveModel::Serializer
  attributes :id, :ticker, :quantity, :cost_basis, :notes, :date
  belongs_to :portfolio

  def date
    object.created_at.strftime("%d-%m-%Y")
  end



end
