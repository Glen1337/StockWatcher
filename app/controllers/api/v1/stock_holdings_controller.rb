class Api::V1::StockHoldingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: StockHolding.all
    # stocks = StockHolding.all
  end

  def destroy
    binding.pry
    StockHolding.find(params[:holding_id]).delete
  end

end
