# Modify external links for collections documents and pages
# - add rel 'noopener' and 'noreferrer'
# - add target _blank
# - add externalLink class

    def external_links(document)

      Jekyll.logger.debug('external link for', document.relative_path)

      doc = Nokogiri::HTML::Document.parse( document.output )
      site_url = document.site.config['url']

      doc.css("a").each do |link|
        url = link["href"]

        next if url == nil
        next if url[0,4] != 'http'
        next if url.downcase.include?(site_url)

        link.add_class('externalLink')
        link['rel'] = 'noopener noreferrer'
        link['target'] = "_blank"

        Jekyll.logger.debug("external link", link.to_s)

      end

      document.output = doc.to_s

    end


Jekyll::Hooks.register :documents, :post_render do |document|
  external_links(document)
end

Jekyll::Hooks.register :pages, :post_render do |page|
  # avoid to proccess js files
  allowed_extensions = ['.md', '.markdown', '.htm', '.html']
  if allowed_extensions.include?( page.ext )
    # external_links(page)
  end
end
