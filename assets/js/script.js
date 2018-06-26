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
