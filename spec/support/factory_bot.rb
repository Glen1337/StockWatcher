require 'factory_bot'

FactoryBot.define do

  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:username) {|n| "user#{n}" }
    password 'password'
    password_confirmation 'password'
  end

  # factory :portfolio do
  #   sequence(:name) {|n| "sector#{n}"}
  # end

end


# create_table "portfolios", force: :cascade do |t|
#   t.bigint "user_id"
#   t.string "name", null: false
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.index ["user_id"], name: "index_portfolios_on_user_id"
# end
