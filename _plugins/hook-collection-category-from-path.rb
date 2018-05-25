# Normal jekyll behaviour is to assign a category
# to a collection document depending on path
# In the case of es/_posts, 'es' is added as a category.
# In the case of _posts/es, 'es' is NOT added as a category.
# this is true for any collection
#
# Here we set category depending on _mycollection/path
# we get category => path and this category is automatically merged to categories array
# this avoid messing with large hierarchy
# and having to set default configuration
# This is only done in collections where isKB == true
# Limitation is that it only takes one level into account
# we cannot do _mycollection/my/path to get categories [my, path]

Jekyll::Hooks.register :documents, :post_init do |document, payload|
  isArticle = document.collection.metadata['isKB']
  path = document.relative_path
  if isArticle
    cat = path.split("/")
    document.data['category'] = cat[1]
    puts("assigned category #{cat[1]} to #{path}")
  else
    puts("no category from path assigned to #{path}")
  end

end