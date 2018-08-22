########################################################################
###
###    Pavement Preservation - Knowledge Base (kb)
###    generator for kb categories index file creation
###

module Jekyll
  class JekyllKBCategoryIndex < Jekyll::Generator
    safe true
    priority :lowest

    # Main plugin action, called by Jekyll-core
    def generate(site)
      kbCollections = site.collections.select {|k, v| v.metadata["isKB"] }
      kbCategories  = site.data["kb-categories"]

      kbCollections.each {|collectionName, collectionDatas|

        # Changes the current working directory of the process to collection dir
        Dir.chdir(collectionDatas.directory)

        # read subdirectories in collection
        subdirs = Dir['*/']

        # each subdir
        subdirs.each {|subdir|
          # if subdir contains no file, do nothing
          if Dir.empty?(subdir)
            break
          end

          # get folder's name by splitting path
          categorySlug = subdir.split('/').first

          # do we have a corresponding entry in kb categories data file ?
          kbCategoryEntry = kbCategories[collectionName].select{ |category|
            category['slug'] == categorySlug
          }

          if kbCategoryEntry.empty?
            Jekyll.logger.error "#{collectionName}:#{categorySlug} as no corresponding entry in _data/kb-categories.yaml file"
          end

          category = kbCategoryEntry.first
          # creates an index file for category
          index = Jekyll::KBCategoryIndexPage.new(site, collectionDatas, category)
          site.pages << index
          Jekyll.logger.info "Category index generator : created index at #{ index.dir }#{ index.name }"
        }
      }

      # Changes the current working directory of the process back to base dir
      Dir.chdir(site.source)
    end
  end

  class KBCategoryIndexPage < Page
    def initialize(site, collectionDatas, category)
      @site = site
      @base = site.source
      @dir  = File.join('/', collectionDatas.label, '/', category["slug"], '/')
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'kb_category_index.html')
      self.data = Utils.deep_merge_hashes(
        self.data,
        {
          'title' => "#{category["name"]}",
          'url'   => @dir,
          #'collection'=> collectionDatas.label,
          'category'  => category["slug"]
        }
      )
    end
  end

end
