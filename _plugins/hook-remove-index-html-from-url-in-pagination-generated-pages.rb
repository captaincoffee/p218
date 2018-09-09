# As of 2018/09/09 paginate v2 generates pages with urls
# ending with index.html.
# We remove this index.html end systematically on each
# generated pages

Jekyll::Hooks.register :site, :pre_render do |site, payload|
  site.pages.each do |page|
    page.url.sub! 'index.html', ''
  end
end
