#!/usr/bin/env ruby
# encoding: utf-8
# Prints every section/category and every tag the site currently uses,
# and which file each one lives in.
#
#   ruby scripts/list_labels.rb
#
require 'yaml'

root = File.expand_path('..', __dir__)
def load(root, rel) = YAML.load_file(File.join(root, rel))

topics = load(root, '_data/topics.yml')
notes  = load(root, '_data/notes.yml')
config = load(root, '_config.yml')

pubs = Dir[File.join(root, '_publications', '*.md')].map do |f|
  head = File.read(f, encoding: 'UTF-8').split(/^---\s*$/)[1].to_s
  YAML.safe_load(head, permitted_classes: [Date]) rescue {}
end.compact

used_by_notes = notes['notes'].to_a.flat_map { |n| n['topics'].to_a }.tally
used_by_pubs  = pubs.flat_map { |p| p['topics'].to_a }.tally

puts
puts "TAGS  ── edit _data/topics.yml ─────────────────────────────────────────"
puts "  %-14s %-22s %-9s %s" % %w[code label colour used_by]
topics.each do |code, t|
  n, p = used_by_notes[code].to_i, used_by_pubs[code].to_i
  use = [("#{p} pub" if p > 0), ("#{n} note" if n > 0)].compact.join(', ')
  puts "  %-14s %-22s %-9s %s" % [code, t['label'], t['color'], use.empty? ? '— (unused)' : use]
end

puts
puts "NOTES SECTIONS  ── edit the `categories:` block in _data/notes.yml ─────"
counts = notes['notes'].to_a.map { |n| n['category'] }.tally
notes['categories'].each do |code, c|
  puts "  %-14s %-30s %s" % [code, c['title'], "#{counts[code].to_i} note(s)"]
end
orphans = counts.reject { |k, _| notes['categories'].key?(k) }
orphans.each { |k, v| puts "  %-14s %-30s %s" % [k.inspect, '(no such category -> Other)', "#{v} note(s)"] }

puts
puts "PUBLICATION SECTIONS  ── edit `publication_category:` in _config.yml ───"
pcounts = pubs.map { |p| p['category'] }.tally
config['publication_category'].each do |code, c|
  puts "  %-14s %-30s %s" % [code, c['title'], "#{pcounts[code].to_i} item(s)"]
end
puts
