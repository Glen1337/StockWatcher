# require 'factory_bot'
#
# FactoryBot.define do
#
#   factory :user do
#     sequence(:email) {|n| "user#{n}@example.com" }
#     sequence(:username) {|n| "user#{n}" }
#     password 'password'
#     password_confirmation 'password'
#   end
#
#   FactoryBot.define do
#     factory :portfolio do
#       sequence(name:) {|n| "sector#{n}"}
#       sequence(user:)
#   end
#
# end
