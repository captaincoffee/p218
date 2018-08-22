---
title: Github project management
---


<!--more-->


## Quick links

 - [Github versioning for P218](https://github.com/captaincoffee/p218)
 - [Github project managment for P218](https://github.com/captaincoffee/p218/projects/1)
 - [Netlify admin interface](https://app.netlify.com/sites/sad-goldberg-49fc15/overview)

## Write a note

You can write a note using [Github Flavored Markdown (GFM)](https://guides.github.com/features/mastering-markdown/)


## Debuging

Jekyll debugging features :

 - Build with verbosity : `bundle exec jekyll serve --verbose`
 - Show an error stack trace : `bundle exec jekyll serve --trace`
 - Build with log message : `export JEKYLL_LOG_LEVEL=debug && bundle exec jekyll serve`
 - Profile build : `bundle exec jekyll serve --profile` (see also profile directive in _config.yml)
 - Inspect a variable : `{{ myVar | inspect }}`

Custom debug features :

 - Custom Inspect a variable : `{{ myVar | debug }}` (see _plugins/debug.rb)
 - Custom commented includes : {% raw %}`{% inc path/filename.ext param='value' param2='value' %}`{% endraw %} (see _plugins/tag-commented-include.rb)
 - Site variables output : see _config.yml

