class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :stock_holdings, dependent: :destroy
  validates :name, presence: true, uniqueness: {
    scope: :user_id
  }

  def value
    sum = 0
    stock_holdings.each do |holding|
      sum += holding.cost_basis
    end
    sum
  end

end
