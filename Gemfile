source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"

gem "rails", "~> 7.0.6"
gem "sprockets-rails"
gem "sqlite3", "~> 1.4"
gem "puma", "~> 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "redis", "~> 5.0"
gem "bootsnap", require: false

group :development, :test do
  gem "debug"
end

group :development do
  gem "web-console"

  gem "rubocop"
  gem "rubocop-minitest"
  gem "rubocop-packaging"
  gem "rubocop-performance"
  gem "rubocop-rails"
  gem "rubocop-md"
end

group :test do
  # Use Cuprite instead when the time comes
  # gem "capybara"
  # gem "selenium-webdriver"
  # gem "webdrivers"
end

gem "cssbundling-rails", "~> 1.2"
