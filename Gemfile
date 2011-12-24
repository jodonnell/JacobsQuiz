source 'http://rubygems.org'

gem 'rails', '3.1.3'

group :assets do
  gem 'sass-rails', "  ~> 3.1.0"
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier', '1.2.0'
end

gem 'jquery-rails'
gem 'devise', '1.5.3'
gem 'haml', '3.1.4'
gem 'heroku', '2.17.0'
# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  gem 'turn', :require => false
end

group :development, :test do
  gem "rspec-rails", "~> 2.7"
  gem 'sqlite3', '1.3.5'
end

group :production do
  gem 'pg', '0.12.0'
  gem 'thin', '1.3.1'
end
