class Api::V1::StockHoldingsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: StockHolding.all
    # stocks = StockHolding.all

  end

end
