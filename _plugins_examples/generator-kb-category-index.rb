########################################################################
###
###    Pavement Preservation - Knowledge Base (kb)
###    generator for kb categories index file creation
###
###

module Jekyll
  class JekyllKBCategoryIndex < Jekyll::Generator
    safe true
    priority :lowest

    # Main plugin action, called by Jekyll-core
    def generate(site)
      @site = site
      kbCollections = site.collections.select {|k, v| v.metadata["isKB"] }
      kbCategories  = site.config["kbCategories"]

      kbCollections.each {|collectionName, collectionDatas|

        base    = @site.in_source_dir(collectionDatas.directory, ".")
        subdirs = Dir.chdir(base) {  @site.reader.filter_entries(Dir["*/"], base) }
        subdirs = subdirs.sort

        subdirs.each {|subdir|
          # if subdir contains no file, do nothing
          if Dir.empty?(base + subdir)
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

    end
  end

  class KBCategoryIndexPage < Page

    def initialize(site, collectionDatas, category)
      @site = site
      @collection = collectionDatas
      @base = site.source
      @dir  = File.join('/', @collection.label, '/', category["slug"], '/')
      @name = 'index.html'


      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), 'kb_category_index.html')
      self.data = Utils.deep_merge_hashes(
        self.data,
        {
          'title' => "#{category["name"]}",
          'permalink' => collectionDatas.metadata["permalink"],
          'collection'=> @collection,
          'category'  => category["slug"],
          'isKBCategoryIndex' => true
        }
      )
    end

    # Returns a hash of URL placeholder names (as symbols) mapping to the
    # desired placeholder replacements. For details see "url.rb"
    def url_placeholders
      {
          :path       => @dir,
          :basename   => basename,
          :output_ext => output_ext,
          :collection => @collection.label
      }
    end
  end

end
