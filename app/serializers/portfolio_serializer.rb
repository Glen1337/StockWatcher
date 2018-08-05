class PortfolioSerializer < ActiveModel::Serializer
  attributes :id, :name, :value

  has_many :stock_holdings
  belongs_to :user

end
