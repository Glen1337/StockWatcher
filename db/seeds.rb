# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create!(email: "mike@gmail.com", password: "password", username: 'glen')
user2 = User.create!(email: "bob@gmail.com", password: "123456", username: 'bob')
user3 = User.create!(email: "hey@hey.com", password: "welcome", username: 'ayy')
user4 = User.create!(email: "example@yahoo.com", password: "twitter", username:'lmao')

port1 = Portfolio.create!(name: "energy", user: user1)
port2 = Portfolio.create!(name: "CompSec", stock_holdings: [], user: user1)
port3 = Portfolio.create!(name: "Primary", user: user3)
port4 = Portfolio.create!(name: "tech", stock_holdings: [], user: user3)
port5 = Portfolio.create!(name: "finance", stock_holdings: [], user: user1)

stock1 = StockHolding.create!(ticker: "INTC", cost_basis: 48, quantity: 1000, portfolio: port4)
stock2 = StockHolding.create!(ticker: "FEYE", cost_basis: 72.643, quantity: 32.6, portfolio: port2)
stock3 = StockHolding.create!(ticker: "PANW", cost_basis: 90.32, quantity: 70.0, portfolio: port2)
stock4 = StockHolding.create!(ticker: "STX", cost_basis: 47, quantity: 150, portfolio: port4)
stock5 = StockHolding.create!(ticker: "CRUS", cost_basis: 91, quantity: 300, portfolio: port4)
stock6 = StockHolding.create!(ticker: "NEE", cost_basis: 32, quantity: 5, portfolio: port1)
stock7 = StockHolding.create!(ticker: "ETP", cost_basis: 67, quantity: 55, portfolio: port1)
stock8 = StockHolding.create!(ticker: "DIS", cost_basis: 32.2, quantity: 8.09, portfolio: port3)
stock9 = StockHolding.create!(ticker: "JPM", cost_basis: 105, quantity: 2000, portfolio: port5)
stock10 = StockHolding.create!(ticker: "WFC", cost_basis: 82.34, quantity: 2000.20, portfolio: port5)
