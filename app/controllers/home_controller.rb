class HomeController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @question = Question.first
  end
end
