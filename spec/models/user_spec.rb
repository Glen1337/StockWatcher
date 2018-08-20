require "rails_helper"

RSpec.describe User, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"

  describe "validations and initializations" do
    # let!(:user1) { FactoryBot.build(:user) }
    let (:user){
      User.new(username: "testuser", email: "testuser@sample.com", password: "passwordtest")
    }

    it "user is valid" do
      #user = FactoryBot.build(:user)
      #expect(user).to be_valid
      expect(user).to be_valid
    end

    it "user has a username" do
      expect(user.username).to eq("testuser")
      expect(user).to be_valid

      user.username = ""
      expect(user).to_not be_valid
    end

    it "user has default initial balance of 10000" do
      expect(user.balance).to eq (10000)
    end

  end
end
