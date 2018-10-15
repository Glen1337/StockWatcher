require 'factory_bot'

FactoryBot.define do

  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:username) {|n| "user#{n}" }
    sequence(:id) {|n| n}
    password 'password'
    password_confirmation 'password'

  end

  factory :portfolio do
    sequence(:name) {|n| "sector#{n}"}
  end

  factory :stock_holding do

  end
  
end
