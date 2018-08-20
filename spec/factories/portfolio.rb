FactoryBot.define do
  factory :portfolio do
    sequence(:name) {|n| "sector#{n}"}
  end
end
