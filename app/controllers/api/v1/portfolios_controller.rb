
class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def show
    render json: Portfolio.find(params[:id]), serializer: PortfolioSerializer
  end

  def index
    if user_signed_in?
      portfolios = Portfolio.all.where(user_id: current_user.id)

      up_to_date_portfolios = serialized_portfolios(portfolios)
      render json:
      {
        portfolios: up_to_date_portfolios
      }
    end
  end

  def create
    @port = Portfolio.new(portfolio_params)
    @port.user = current_user
    if @port.save
      render json: { name: @port.name, id: @port.id }
    else
      render json: { error: @port.errors.full_messages }, status: :unprocessable_entity
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
