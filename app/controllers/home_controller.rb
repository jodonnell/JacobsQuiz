class HomeController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @question = Question.skip(rand(Question.count))[0]
  end
end
