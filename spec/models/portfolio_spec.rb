require "rails_helper"

RSpec.describe Portfolio, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"

  describe "validations" do
    # specify id: 3?
    let!(:user1) { FactoryBot.build(:user, username: "user1") }
    let!(:portfolio1) { FactoryBot.build(:portfolio, name: "Tech Portfolio", user: user1) }

    it "portfolio is valid" do
      expect(portfolio1).to be_valid
    end

    it "portfolio has a name" do
      expect(portfolio1.name).to eq("Tech Portfolio")
      portfolio1.name = nil
      expect(portfolio1).to_not be_valid
    end

    it "portfolio belongs to correct user" do
      expect(portfolio1.user.id).to eq(3)
      portfolio1.user = nil
      expect(portfolio1).to_not be_valid
    end

  end
end
