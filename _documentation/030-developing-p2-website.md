---
title: Developing P2 website
---

## Stack

### Back end
 - git / Github
 - **ruby** managed with [rbenv](https://github.com/rbenv/rbenv)
   see [netlify current supported versions](https://www.netlify.com/docs/#ruby)
 - **bundler**
 - **jekyll: 3.8.4**

### Front end
 - **bootstrap** + **popper.js**
 - **jquery** + **jquery.cookie**
 - **instantsearch**

See package.json and yarn.lock for versions.

## Unbuntu 18.04 development environment install

### Git and Github connectivity

 - Command : `sudo apt-get install git git-gui`
 - generate a new ssh key (see [doc on Github](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/))
 - add your public key to github (see [doc on Github](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/))
 - test github connection : `ssh -T git@github.com` ([documentation](https://help.github.com/articles/testing-your-ssh-connection/))

To use git-gui
 - `cd path/to/repo`
 - `git gui`

### Ruby

 - Install some libraries : `sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev`

> be sure to uninstall rvm ([see SO question](https://stackoverflow.com/a/3558763/1548376))
> `rm -rf ~/.rvm` and clean your .bashrc file for any call
{:.blockquote .alert .alert-danger}

 - Install rbenv (see [rbenv](https://github.com/rbenv/rbenv#installation))

   If you already have rbenv installed you can just update with : `cd ~/.rbenv && git pull`

 - Install ruby-build (see [ruby-build](https://github.com/rbenv/ruby-build#readme))

   If you already have ruby-build installed you can just update with : `cd ~/.rbenv/plugins/ruby-build && git pull`

 - Install desired ruby version :

```
# list all available versions:
rbenv install -l

# install ruby 2.4.3
rbenv install 2.4.3

# install bundler
gem install bundler

# rehash
rbenv rehash
```

### Node js

We need node/yarn to install javascript and scss dependencies (bootstrap, algolia, ...)

 - [install nvm](https://github.com/creationix/nvm#installation)
 - [install yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)

### Get the code and run !

    # cd to your web root
    # eg :
    cd ~/www

    # clone repository
    git clone git@github.com:captaincoffee/p218.git
    cd p218

    # install gems
    bundle install

    # install bootstrap, jquery, algolia, ...
    yarn

    # start the server
    bundle exec jekyll serve --config _config.yml,_config_dev.yml,_config_local.yml

**You site is now live at [http://127.0.0.1:4000](http://127.0.0.1:4000)**


## Quick links

 - [Github versioning for P218](https://github.com/captaincoffee/p218)
 - [Github project managment for P218](https://github.com/captaincoffee/p218/projects/1)
 - [Netlify admin interface](https://app.netlify.com/sites/sad-goldberg-49fc15/overview)
 - [Algolia serch dashboard](https://www.algolia.com/apps/K3NGJZEZ95/dashboard)
 - [Forestry.io CMS](https://app.forestry.io/dashboard/)
