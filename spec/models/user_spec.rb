require "rails_helper"

RSpec.describe User, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"
  describe "user" do
    let!(:user1) { FactoryBot.create(:user) }
    it "user has a username" do
      user = FactoryBot.create(:user)

      expect(user).to be_valid
      expect(user1).to be_valid

    end
  end
end
