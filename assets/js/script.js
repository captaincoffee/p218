---
layout: null
---
// target='_blank' on url that are not par of the current domain
// see http://stackoverflow.com/questions/4425198/markdown-target-blank
(function() {
    let links = document.links
    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
       if (links[i].hostname != window.location.hostname) {
           links[i].target = '_blank'
           links[i].className += ' externalLink'
           links[i].rel = "noopener noreferrer"
       }
    }
})();

// cookie agreement
$(function() {
  if ( $.cookie('cookiesAgreement') == undefined ){
    $('.cookiesAgreement').show();
    $('.agreeCockies').click(
      function(){
        $.cookie('cookiesAgreement', 'http://www.youtube.com/watch?v=MMb3fd7fwec', { expires: 365, path: '/' });
        $('.cookiesAgreement').hide();
      }
    );
  }
});

// algolia search
// instantiate the v3 way
// https://community.algolia.com/instantsearch.js/v2/guides/prepare-for-v3.html#new-usage
const search = instantsearch({
  indexName: '{{ site.algolia.index_name }}',
  searchClient: algoliasearch('{{ site.algolia.application_id }}', '{{ site.algolia.search_only_api_key }}'),
  routing: true,
  searchParameters: {
    typoTolerance: false
  },
  searchFunction: function(helper){
    let q = helper.state.query;

    if (q.length > 2) {
      helper.search();
      $('#search-query').html(q);
      $('#search-results').show();
      return helper;
    } else {
      $('#search-results').hide();
      return;
    }

    console.log(q);
    console.log(helper);
  }
});

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
            <h2><a class="post-link" href="{{ site.baseurl }}${hit.url}">${hit._highlightResult.title.value}</a></h2>
            <div class="post-snippet">${hit._highlightResult.html.value}</div>
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
    searchOnEnterKeyPressOnly: false
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list2',
    attributeName: 'categories',
    collapsible: true,
    operator: 'or',
    templates: {
      header: 'Category'
    }
  })
);

search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: '#current-refined-values',
    attributes: [
      {name: 'categories', label: 'Category'},
      {name: 'tags', label: 'Tags'},
    ],
    onlyListedAttributes: true,
    clearAll: 'before',
    clearsQuery: true,
    onlyListedAttributes: true,
    collapsible: true,
    clearsQuery: true
  })
);

  // initialize pagination
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      maxPages: 20,
      // default is to scroll to 'body', here we disable this behavior
      scrollTo: false
    })
  );

search.addWidget(
  instantsearch.widgets.hitsPerPageSelector({
    container: '#hits-per-page-selector',
    items: [
      {value: 3, label: '3 per page', default: true},
      {value: 6, label: '6 per page'},
      {value: 12, label: '12 per page'},
    ]
  })
);
search.start();
