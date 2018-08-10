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

  def create
    binding.pry
    if user_signed_in?
      p = stock_holding_params
      @holding = StockHolding.new(stock_holding_params)
      @holding.portfolio = Portfolio.find_by(name: params[:portfolio])
      if @holding.save
        render json: @holding
      else
        render json: { error: @holding.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

end

def stock_holding_params
  params.require(:stock_holding).permit(:ticker, :quantity, :cost_basis)
end
