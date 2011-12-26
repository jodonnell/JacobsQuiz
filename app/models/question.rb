class Question
  include Mongoid::Document

  field :description, type: String

  def git_commands
    attributes.keys.select do |key|
      true if key.starts_with? 'git'
    end
  end

  def git_interactions_json
    hash = {}
    git_commands.each do |command|
      hash[command] = self[command]
    end
    hash.to_json
  end
end
