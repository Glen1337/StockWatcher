class AddBalanceToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :balance, :decimal, scale: 7, precision: 12, null: false, default: 10000
  end
end
