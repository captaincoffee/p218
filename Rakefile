require "rubygems"

require 'benchmark'
include Benchmark # we need the CAPTION and FORMAT constants

require 'git' # code https://github.com/schacon/ruby-git
              # API http://www.rubydoc.info/gems/git/1.2.9.1/Git

require_relative '_rakelibs/benchUtils.rb'
require_relative '_rakelibs/jekyllCommands.rb'
require_relative '_rakelibs/dummies.rb'
require_relative '_rakelibs/dummiesUtils.rb'
require_relative '_rakelibs/githubUtils.rb'

$debug1 = false
$debug2 = true

# number of time site is build when doing a rake bench
# this allows to get an average
$benchmarkCycles = 3

# counting total number of element created
$elementCounter = 0

$rootPath = __dir__
d1("Current directory : #{$rootPath}")

$configPath = File.join($rootPath, '_config.yml')

$posts_dir      = "_posts"
$pages_dir      = "_pages"
# $collectionsNames = ['manage']
$collectionsNames = ['manage', 'materials', 'methods']

$numberOfPosts = 3
$articlesPerCollection = 2

$default_ext    = "md"

$numberOfCategories = 30 # or less depending on collection's categories number

################  TAGS SETUP #####################
$numberOfTags   = 50 # total number of tags - common to all collections
$minTagsPerItem = 5  # minimum number of tag attributed to one article
$maxTagsPerItem = 10 # maximum number of tag attributed to one article

task :default => [:publish]

desc "Creates dummy articles"
task :dummy do
    # create a tag pool that is common to all collections
    $tagsPool = get_tags_pool()
    $collectionsNames.each do |collectionName|
        d2("-- Calling clean_categories_pages on #{collectionName}")
        clean_categories_pages(collectionName)
        d2("-- Calling create_elements on #{collectionName}")
        create_elements( 'collection', $articlesPerCollection, true, collectionName )
    end

    create_elements( 'post', $numberOfPosts, true )

    Rake::Task[:catpages].invoke

    d2( "created #{$elementCounter} total items" )
end

desc "Create pages for collection's categories"
task :catpages do
  $collectionsNames.each do |collectionName|
    create_categories_pages( collectionName )
  end
end

desc "Launch n successive builds"
task :bench do
    d2(">> Starting benchmarks")
    Rake::Task[:dummy].invoke
    Benchmark.benchmark(CAPTION, 7, FORMAT, ">total:", ">avg:") do |x|

        total = Benchmark::Tms.new

        $benchmarkCycles.times do |i|
            task = x.report("build #{i + 1} ") do
                Rake::Task[:build].invoke
                Rake::Task[:build].reenable
            end
            total += task
        end

        [ total, total / $benchmarkCycles ]
    end
end

desc "list tasks"
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts "(type rake -T for more detail)\n\n"
end
