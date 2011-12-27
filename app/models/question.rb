class Question
  include Mongoid::Document

  field :description, type: String

  def git_commands
    git_commands = attributes.keys.select { |key| true if key.starts_with? 'git' }
  end

  def git_interactions_json
    hash = {}
    git_commands.each {|command| hash[unescape_periods(command)] = self[command] }
    hash.to_json
  end

  private

  def unescape_periods command
    command.gsub("_*:", ".")
  end
end
