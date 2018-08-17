class Api::V1::StockHoldingsController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }

  before_action :authenticate_user!

  def index
    render json: StockHolding.all
    # stocks = StockHolding.all
  end

  def destroy
    # add balance to user with this holding
    if user_signed_in?
      current_user.balance += (params[:current_price] * StockHolding.find_by(id: params[:holding_id]).quantity)
      current_user.save
      stock = StockHolding.find(params[:holding_id])
      stock.delete
      render json: { deleted: stock.ticker }
    end
  end

  def create
    if user_signed_in?
      @holding = StockHolding.new(stock_holding_params)
      @holding.portfolio = Portfolio.find_by(id: params[:portfolio], user_id: current_user.id )
      if (@holding.cost_basis * @holding.quantity) > current_user.balance
        render json: { error: ["Insufficient cash balance in account"] }
      elsif @holding.save
        current_user.balance -= (@holding.cost_basis * @holding.quantity)
        current_user.save
        render json: @holding
      else
        render json: { error: @holding.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

end

def stock_holding_params
  params.require(:stock_holding).permit(:ticker, :quantity, :cost_basis, :notes)
  # .merge(portfolio_id: :portfolio)
end
