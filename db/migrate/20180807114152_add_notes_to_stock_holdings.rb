class AddNotesToStockHoldings < ActiveRecord::Migration[5.2]
  def change
    add_column :stock_holdings, :notes, :text, default: ''
  end
end
