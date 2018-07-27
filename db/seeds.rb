# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

stock1 = StockHolding.create!(ticker: "INTC", cost_basis: 48, quantity: 1000)
stock2 = StockHolding.create(ticker: "FEYE", cost_basis: 72.643, quantity: 32.6)
stock3 = StockHolding.create(ticker: "PANW", cost_basis: 90.32, quantity: 70.0)
stock3 = StockHolding.create(ticker: "M", cost_basis: 47, quantity: 5)


port1 = Portfolio.create(name: "CompSec", stock_holdings: [])
port2 = Portfolio.create(name: "Primary")

user1 = User.create!(email: "mike@gmail.com", password: "123456")
user2 = User.create(email: "bob@gmail.com", portfolios: "123456")
