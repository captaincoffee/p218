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
    let minSearchLength = {{ site.customAlgolia.minSearchLength }};
    $('#search-query').html(q);
    console.log("++++++++++++++++++ searchFunction")
    console.log("Current query : " + q);
    if (q.length >= minSearchLength) {
      console.log("Querying server for : " + q);
      helper.setQuery(q)
          .setPage(0)
          .search();
    } else {
      console.log('Minimal Query length to search = ' + minSearchLength)
      // In case we are in a clear all process (see instantsearch.widgets.clearAll bellow)
      // search box is not cleared
      // hits are not cleared
      helper.setQuery("").setPage(0);
    }


    console.log("-------------------- END searchFunction")
  }
});

// hits
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: function(hit) {
        //console.log(hit);
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
// searchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    autofocus: true,
    placeholder: 'Search P2 ...',
    reset: true,
    poweredBy: true,
    magnifier: true,
    loadingIndicator: true,
    searchOnEnterKeyPressOnly: false
  })
);
//refinementList
// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#refinement-list2',
//     attributeName: 'categories',
//     collapsible: true,
//     operator: 'or',
//     templates: {
//       header: 'Category'
//     }
//   })
// );
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
// search.addWidget(
//   instantsearch.widgets.pagination({
//     container: '#pagination',
//     maxPages: 20,
//     // default is to scroll to 'body', here we disable this behavior
//     scrollTo: false
//   })
// );
//hitsPerPageSelector
// search.addWidget(
//   instantsearch.widgets.hitsPerPageSelector({
//     container: '#hits-per-page-selector',
//     items: [
//       {value: 3, label: '3 per page', default: true},
//       {value: 6, label: '6 per page'},
//       {value: 12, label: '12 per page'},
//     ]
//   })
// );

// initialize clearAll
search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: 'Reset everything'
    },
    autoHideContainer: false,
    clearsQuery: true
  })
);

search.start();

