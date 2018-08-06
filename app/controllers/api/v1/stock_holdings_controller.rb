class Api::V1::StockHoldingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    binding.pry
    render json: StockHolding.all
    # stocks = StockHolding.all
  end

  def destroy
    stock = StockHolding.find(params[:holding_id])
    stock.delete
    render json: { deleted: stock.ticker }
  end

end
