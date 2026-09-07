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

# ── problems worth knowing about ─────────────────────────────────────────
problems = []

notes['notes'].to_a.each do |n|
  t = n['topics']
  next if t.nil?
  unless t.is_a?(Array)
    problems << "topics 寫成字串: #{n['title']}  →  改成  topics: [#{t}]"
  end
end
pubs.each do |p|
  t = p['topics']
  next if t.nil?
  problems << "topics 寫成字串: #{p['title']}  →  改成  topics: [#{t}]" unless t.is_a?(Array)
end

(used_by_notes.keys + used_by_pubs.keys).uniq.each do |code|
  problems << "標籤 \"#{code}\" 沒有定義在 _data/topics.yml（會顯示成灰色原始字）" unless topics.key?(code)
end

note_cats = notes['categories'].to_a.map(&:first)
notes['notes'].to_a.each do |n|
  c = n['category']
  next if c.nil?
  problems << "分類 \"#{c}\" 不在 categories: 裡（會掉到 Other 區）: #{n['title']}" unless note_cats.include?(c)
end

puts
if problems.empty?
  puts "CHECKS  ── 沒有發現問題 ✅"
else
  puts "CHECKS  ── 發現 #{problems.size} 個問題 ⚠️"
  problems.each { |x| puts "  · #{x}" }
end
puts
