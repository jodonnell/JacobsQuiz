require 'spec_helper'

describe Question do
  it "has a description" do
    Question.create :description => 'You have accidentally commited the README file in the last commit.  Fix it.'
  end
end
