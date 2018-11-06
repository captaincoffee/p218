---
title: Jekyll
---

## Why a Static Site Generator (SSG) ?

Because, at some point, it can be good for your mental health.

## Why Jekyll

## Working with Jekyll


### Debuging jekyll

Jekyll debugging features :

 - Build with verbosity : `bundle exec jekyll serve --verbose`
 - Show an error stack trace : `bundle exec jekyll serve --trace`
 - Build with log message : `export JEKYLL_LOG_LEVEL=debug && bundle exec jekyll serve`
 - Profile build : `bundle exec jekyll serve --profile` (see also profile directive in _config.yml)
 - Inspect a variable : `{{ myVar | inspect }}`

Custom debug features :

 - Custom Inspect a variable : `{{ myVar | debug }}` (see _plugins/debug.rb)
 - Custom commented includes : see _plugins/custom_include_tag.rb
 - Site variables output : see _config.yml


## Plugins

### [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2)

#TODO how to setup on (posts, kb)

### [jekyll-algolia](https://github.com/algolia/jekyll-algolia)

#TODO get rid of the fork we currently use

Search is performed thanks to [Jekyll Algolia gem](https://community.algolia.com/jekyll-algolia/getting-started.html) that pushes site content to Algolia servers, and [InstantSearch.js](https://community.algolia.com/instantsearch.js/v2/getting-started.html) that permit to integrate search on the site.

P2 indexed elements are posts, Knowledge base collections items

Regular pages, News listing pages and KB indexes pages are not indexed.

#### Setup

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


