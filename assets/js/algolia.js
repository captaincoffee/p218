---
layout: null
---

// as our search box and results are in a bootstrap modal
// we need to set focus on search box when modal opens
// see : https://getbootstrap.com/docs/4.1/components/modal/
$('#search-results').on('shown.bs.modal', function () {
  console.log("shown.bs.modal on '#search-results' : setting focus")
  $('#search-box .ais-search-box--input').trigger('focus')
})


// and we need to erase search box when modal closes
// $('#search-results').on('hide.bs.modal  ', function () {
//   console.log("hide.bs.modal on '#search-results' : clearing search box")
//   $('#search-box .ais-search-box--input').val("");
//   // search.SearchParameters.setQuery("");
//   console.log("closing modal")
//   // console.log(search.helper.setQuery(""))
// })

const search = instantsearch({
  indexName: '{{ site.algolia.index_name }}',
  searchClient: algoliasearch('{{ site.algolia.application_id }}', '{{ site.algolia.search_only_api_key }}'),
  routing: false,
  searchParameters: {
    typoTolerance: false,
    hitsPerPage: 10,
  },
  searchFunction: function(helper){
    console.log("++++++++++++++++++ searchFunction")
    // error: triggered when Algolia sends back an error
    helper.on('change', function(content) {
      console.log('helper on change')
    });
    // search: triggered when the search is sent to Algolia
    helper.on('search', function(content) {
      console.log('helper on search')
    });
    // result: triggered when the results are retrieved Algolia
    helper.on('result', function(content) {
      console.log('helper on result')
    });
    // change: triggered when a parameter is set or updated
    helper.on('error', function(content) {
      console.log('helper on error')
    });

    let q = helper.state.query
    let minSearchLength = {{ site.customAlgolia.minSearchLength }}
    $('#search-query').html(q)
    console.log("Current query : " + q)
    helper.search()
    console.log("-------------------- END searchFunction")
  }
});

const searchBox = instantsearch.widgets.searchBox({
  container: '#search-box',
  autofocus: true,
  placeholder: 'Search P2 ...',
  reset: true,
  poweredBy: true,
  magnifier: true,
  loadingIndicator: true,
  searchOnEnterKeyPressOnly: false
})

search.addWidget( searchBox )

// hits
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: function(hit) {
        // console.log(hit)
        const date = new Date(hit.date * 1000);
        const dateFormatted = date.toISOString().slice(0,10);
        return `
          <div class="post-item">
            <span class="post-meta">${dateFormatted}</span>
            <h4><a class="post-link" href="{{ site.baseurl }}${hit.url}">${hit._highlightResult.title.value}</a></h4>
            <div class="post-snippet">${hit._highlightResult.html.value}</div>
          </div>
        `;
      }
    }
  })
);

//refinementList
search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#refinement-list2',
    attributeName: 'categories',
    sortBy: [ "isRefined", "name:asc" ],
    collapsible: true,
    autoHideContainer: true,
    operator: 'or',
    templates: {
      header: 'Category (click to hide)'
    }
  })
);
//currentRefinedValues
// search.addWidget(
//   instantsearch.widgets.currentRefinedValues({
//     container: '#current-refined-values',
//     attributes: [
//       {name: 'categories', label: 'Category'},
//       {name: 'tags', label: 'Tags'},
//     ],
//     onlyListedAttributes: true,
//     clearAll: 'before',
//     clearsQuery: true,
//     onlyListedAttributes: true,
//     collapsible: true,
//     clearsQuery: true
//   })
// );
// initialize pagination
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    maxPages: 10,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);
//hitsPerPageSelector
// search.addWidget(
//   instantsearch.widgets.hitsPerPageSelector({
//     container: '#hits-per-page-selector',
//     items: [
//       {value: 2, label: '2 per page', default: true},
//       {value: 20, label: '20 per page'},
//       {value: 50, label: '50 per page'},
//     ]
//   })
// );

// initialize clearAll
// search.addWidget(
//   instantsearch.widgets.clearAll({
//     container: '#clear-all',
//     templates: {
//       link: 'Reset everything'
//     },
//     autoHideContainer: true,
//     clearsQuery: true
//   })
// );

search.start();

