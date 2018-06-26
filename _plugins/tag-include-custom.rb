module Jekyll
  module Tags

    # Custom include tag
    # add comments around includes
    # if *comment_includes* configuration is set to *true* in _config.yml
    # use :
    # {% inc path/filename.ext param='value' param2='value' %}
    class IncludeCustomTag < IncludeTag

      # This method allows to modify the file content by inheriting from the class.
      def read_file(file, context)
        fileContent = File.read(file, file_read_opts(context))

        site  = context.registers[:site]
        debug = site.config['comment_includes']

        if debug
          file.slice!(site.source)
          fileContent = "<!-- #{file} -->\n#{fileContent}<!-- End #{file} -->"
        end

        fileContent

      end

    end
  end
end

Liquid::Template.register_tag("inc", Jekyll::Tags::IncludeCustomTag)
