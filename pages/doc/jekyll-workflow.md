---
title:  Jekyll workflow
---

jekyll.serve

  jekyll.configuration
  # Merge DEFAULTS < _config.yml < override

  build.process(config)

    site.new(options)
      site.initialize
        site.reset
          # THIS HOOK IS NOT FIRING hook.@registry not initialized
          Hook :site, :after_reset, site
        site.setup
          # Hooks are only registered here
          # in hook.@registry
          plugin_manager.conscientious_require

        # This one will be the first to fire
        # the "site" var only contains configuration datas
        # everything else is empty
        Hook :site, :after_init, site

    build.build(site, options)
      command.process_site(site)
        site.process
          site.reset # SECOND TIME
            # this will fires
            # the "site" var only contains configuration datas
            # everything else is empty
            Hook :site, :after_reset, site
          site.read
            reader.read
              set site.layouts
              reader.read_directories
                retrieve_posts
                  post_reader.read_posts
                    document.initialize
                      categories_from_path

                      # document is not processed
                      # document.site var is available
                      Hook :posts, :post_init, document
                      Hook :documents, :post_init, document

                retrieve_dirs
                retrieve_pages
                  page.initialize
                    Hook :pages, :post_init, page


                retrieve_static_files

              CollectionReader.new(site).read
                collection_reader.read
                  document new
                    Hook :posts, :post_init, document
                    Hook :documents, :post_init, document

            Hook :site, :post_read, site

          generate

            post and document post init hook can be called
            depending on what type of content is created (??)


          render

            Jekyll::Hooks.trigger :site, :pre_render, site, payload

            render_docs(payload)

              Hook :posts, :pre_render, document, payload
              Hook :documents, :pre_render, document, payload
              render_regenerated
              Hook :posts, :post_render, document
              Hook :documents, :post_render, document

            render_pages(payload)
              Hook :pages, :pre_render, page, payload
              Hook :pages, :post_render, page

            Jekyll::Hooks.trigger :site, :post_render, site, payload

          cleanup
            Jekyll::Hooks.trigger :clean, :on_obsolete, out

          write

            pages, documents and collections specific hook are fired
            on post_write

            Jekyll::Hooks.trigger :site, :post_write, self

          print_stats if config["profile"]