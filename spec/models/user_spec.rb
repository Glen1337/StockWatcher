require "rails_helper"

RSpec.describe User, type: :model do
  #pending "add some examples to (or delete) #{__FILE__}"

  describe "validations and initializations" do
    let!(:user1) { FactoryBot.build(:user, username: "user1") }

    # let (:user1){
    #   User.new(username: "testuser", email: "testuser@sample.com", password: "passwordtest")
    # }

    it "user is valid" do
      expect(user1).to be_valid
    end

    it "user has a username" do
      expect(user1.username).to eq("user1")
      expect(user1).to be_valid

      user1.username = ""
      expect(user1).to_not be_valid
    end

    it "user has default initial balance of 10000" do
      expect(user1.balance).to eq (10000)
    end

  end
end
