class Api::V1::PortfoliosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Portfolio.all
  end

end
