class CreateStockHoldings < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_holdings do |t|
      t.belongs_to :portfolio
      t.string :ticker, null: false, unique: true
      t.decimal :quantity, null: false, scale: 7, precision: 12
      t.decimal :cost_basis, null: false, scale: 7, precision: 12
      t.timestamps null: false
    end
  end
end

#scale = # digits after .
#precision = # digits total
