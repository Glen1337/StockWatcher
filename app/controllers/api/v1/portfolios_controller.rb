
class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    portfolios = Portfolio.all.where(user_id: current_user.id)

    up_to_date_portfolios = serialized_portfolios(portfolios)
    render json:
    {
      portfolios: up_to_date_portfolios
    }
  end

  def serialized_portfolios(data)
    ActiveModel::Serializer::ArraySerializer.new(
      data,
      each_serializer: PortfolioSerializer)
  end

end
