Jekyll::Hooks.register :documents, :pre_render do |document, payload|

=begin
  Get related articles from each Knowledge base collection based on tag matches

  configuration in _config.yml

  maxRelated :  maximum number of related items retrieved
  minTagMatch : minimum number of common tags for an item to be considered as related

  This add a **related** property to kb documents

  **related** is an array of hashes representing documents with following properties

  document{
    'title'=> str,
    'url'  => str,
    'date' => date,
    'collection' => str,
    'commonTags' => array
  }
=end

  # only for knowledge base documents
  if document.collection.metadata['isKB']

    tags = document.data['tags']
    site = payload['site']
    maxRelated  = site['maxRelated']
    minTagMatch = site['minTagMatch']
    relatedDocs = []
    allDocs     = []
    matchedComplete = false

    site['collections'].each { |collection|
      if collection["isKB"] == true
        allDocs += collection['docs']
      end
    }

    allDocs = allDocs.sort_by {|doc| doc.date}.reverse

    allDocs.each { |doc|

      # Don't scan an article that is current doc
      if doc['title'] == document['title']
        next
      end

      docTags = doc.data['tags']

      # get common tags
      commonTags = tags & docTags

      if commonTags.length >= minTagMatch

        related = {
            'title'=> doc.data['title'],
            'url'  => doc.url,
            'date' => doc.data['date'],
            'collection' => doc.collection.label,
            'commonTags' => commonTags
        }

        relatedDocs.push related

        if relatedDocs.length >= maxRelated
          matchedComplete = true
        end
      end

      if matchedComplete == true
        break
      end
    }

    if relatedDocs.length > 0
      document.data['related'] = relatedDocs
    end

  end
end
