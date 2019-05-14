---
title: Search
---

## How we search on P2

Search is performed thanks to [Jekyll Algolia gem](https://community.algolia.com/jekyll-algolia/getting-started.html) that puches site content to Algolia servers, and [InstantSearch.js](https://community.algolia.com/instantsearch.js/v2/getting-started.html) that permit to integrate search on the site.


Jekyll algolia gem


## Jekyll Algolia

Jekyll Algolia is used to send site content indexing to Algolia servers.

Indexed elements are posts, Knowledge base collections items

Regular pages, News listing pages and KB indexes pages are not indexed.

## Need to review this because kb permalinks have changed.


## Setup

jekyll _config.yaml file :

``` yaml
algolia:
  application_id: 'K3NGJZEZ95'
  search_only_api_key: '66a4234e97f1002b75f7eb36ed40eee7'
  index_name: 'p218'

  files_to_exclude:
    - kb/manage/*/index.html
    - kb/materials/*/index.html
    - kb/methods/*/index.html*
    - documentation/**
    - faq/**
    - legal/**
    - pages/**
```

Launch indexation after each content edition.
See Algolia dashboard for Algolia API key.

``` bash
ALGOLIA_API_KEY='your_secret_key' bundle exec jekyll algolia
```

## Netlify setup

see : https://community.algolia.com/jekyll-algolia/netlify.html
