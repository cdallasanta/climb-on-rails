require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:good_comment) {Comment.new(user:User.new, content:"test content")}

  it "belongs to a user" do
    expect(good_comment.user).to be_a User
  end

  it "can belong to a section" do
    belonging_comment = Comment.new(commentable: Section.new)
    expect(belonging_comment.commentable).to be_a Section
  end

  it "has content" do
    expect(good_comment.content).to be_a String
  end
end
