class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.belongs_to :user
      t.string :name, null: false, unique: true
      t.timestamps null: false
    end
  end
end
