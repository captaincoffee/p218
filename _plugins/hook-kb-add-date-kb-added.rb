Jekyll::Hooks.register :documents, :pre_render do |document, payload|

=begin ################################################
  Fill date_added_kb front matter field if necessary
  AND
  Ensure that all date_added_kb are Time objects

  This avoid errors when sorting kb articles by this field
=end

  # only for knowledge base documents
  if document.collection.metadata['isKB']

    d = document.data
    date       = d['date']
    date_added = d['date_added_kb']

    if date_added.nil? or date_added == ''
      document.data['date_added_kb'] = date.to_time
    end

    if date_added.kind_of?(Date)
      document.data['date_added_kb'] = date_added.to_time
    end

  end
end
