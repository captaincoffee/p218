Jekyll::Hooks.register :documents, :pre_render do |document, payload|

=begin
  Fill date_added_kb front matter field if necessary
  AND
  Ensure that all date_added_kb are Time objects

  This avoid errors when sorting kb articles by this field
=end

  # only for knowledge base documents
  if document.collection.metadata['isKB']

    date       = document.data['date']
    date_added = document.data['date_added_kb']

    if date_added.nil? || date_added.kind_of?(Date)
      date_added = date.to_time
      document.data['date_added_kb'] = date_added
    end

    Jekyll.logger.info "Date added:", "#{document.data['date_added_kb'].class} : #{document.data['date_added_kb'].pretty_inspect}"
  end
end
