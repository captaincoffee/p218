
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: function(hit) {
        console.log(hit);
        return `
          <div class="post-item">
            <span class="post-meta">${hit.date}</span>
            <h2><a class="post-link" href="{{ site.baseurl }}${hit.url}">${hit.title}</a></h2>
            <div class="post-snippet">${hit.html}</div>
          </div>
        `;
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search P2 ...',
    poweredBy: true,
    magnifier: true,
    loadingIndicator: true,
    searchOnEnterKeyPressOnly: true
  })
);

search.start();
