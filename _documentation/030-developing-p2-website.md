---
title: Developing P2 website
---

## Stack

### Back end
 - **ruby** managed with [rbenv](https://github.com/rbenv/rbenv)
   see [netlify current supported versions](https://www.netlify.com/docs/#ruby)
 - **bundler**
 - **jekyll: 3.8.4**

### Front end
 - **bootstrap** + **popper.js**
 - **jquery** + **jquery.cookie**
 - **instantsearch**

See package.json and yarn.lock for versions.

## Quick links

 - [Github versioning for P218](https://github.com/captaincoffee/p218)
 - [Github project managment for P218](https://github.com/captaincoffee/p218/projects/1)
 - [Netlify admin interface](https://app.netlify.com/sites/sad-goldberg-49fc15/overview)
 - [Algolia serch dashboard](https://www.algolia.com/apps/K3NGJZEZ95/dashboard)
 - [Forestry.io CMS](https://app.forestry.io/dashboard/)

## Debuging jekyll

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

