
class Api::V1::PortfoliosController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate_user!

  def destroy
    if user_signed_in?
      portfolio = Portfolio.find(params[:id])
      # dont sell all stock_holdings in this portfolio on delete
      portfolio.delete
      render json: { portfolios: serialized_portfolios(Portfolio.all.where(user_id: current_user.id)) }
    end
  end

  def show
    if user_signed_in?
      render json: Portfolio.find(params[:id]), serializer: PortfolioSerializer
    end
  end

  def index
    if user_signed_in?
      portfolios = Portfolio.all.where(user_id: current_user.id)
      # up_to_date_portfolios = serialized_portfolios(portfolios)
      render json:
      {
        portfolios: serialized_portfolios(portfolios),
        user: current_user
      }
    end
  end

  def create
    if user_signed_in?
      @port = Portfolio.new(portfolio_params)
      @port.user = current_user
      if @port.save
        render json: @port
      else
        render json: { error: @port.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def serialized_portfolios(data)
    ActiveModel::Serializer::ArraySerializer.new(
      data,
      each_serializer: PortfolioSerializer)
  end

  def portfolio_params
    params.require(:portfolio).permit(:name)
  end

end
