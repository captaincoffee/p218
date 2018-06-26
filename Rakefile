require "rubygems"

require 'benchmark'
include Benchmark # we need the CAPTION and FORMAT constants

require_relative '_rakelibs/benchUtils.rb'
require_relative '_rakelibs/dummies.rb'
require_relative '_rakelibs/dummiesUtils.rb'
require_relative '_rakelibs/githubUtils.rb'

$debug1 = false
$debug2 = true

# number of time site is build when doing a rake bench
# this allows to get an average
$benchmarkCycles = 1

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

task :default => [:bench]

desc "Creates dummy posts"
task :dp do
    create_elements( 'post', $numberOfPosts, true )
    d2( "created #{$elementCounter} total posts" )
end

desc "Creates dummy kb article"
task :da do
    # create a tag pool that is common to all collections
    $tagsPool = get_tags_pool()
    $collectionsNames.each do |collectionName|
        d2("-- Calling create_elements on #{collectionName}")
        create_elements( 'collection', $articlesPerCollection, true, collectionName )
    end
    d2( "created #{$elementCounter} total kb articles" )
end

desc "Launch n successive builds to test performance"
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
