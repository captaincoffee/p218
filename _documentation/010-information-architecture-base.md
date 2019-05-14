---
title: Pavement Preservation (P2) Information Architecture (IA)
---

## Website structure
* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

 - News
 - Agenda
 - Pavement Preservation Knowledge Base (now called Resources)
 - Faq

### News

#### General
Jekyll posts are used for news
Standard front matter for posts

FOR NOW IT'S THE SAME AS KB ARTICLES

{% highlight yaml %}
---
title: Post title

# for posts, this variable is optional
# because jekyll guess date
# from file name 2018-12-24-my-file-name.md
date: 2010-12-24 19:49:13


date_kb: 2014-12-13 19:49:00

# publication state
# default: true
# once set to false the post/collection article ????
# will not be processed by jekyll
published: true

# Main source and source url if needed
source: Name of the source
source-url: http://example.com/source

tags:
  - tag1
  - tag2
  - tag3

category: # NOT IN USE
categories: # NOT IN USE

# illustration images must be stored in path like
# /assets/img/{{ collection.name }}/{{ year }}/{{ month }}/
image_name: my_picture.jpg
image_source: P2
image_caption: Nice view from my window

title_color: red

# some youtube video
# we can have several providers
video_embed:

# what is this ?
sidebar:

# what is this ?
lead:

---
{% endhighlight %}

### Knowledge Base (KB)

  - KB base element is a collection's file, and we call it **Article**
  - We have three **collections** used to display **articles** : **methods**, **materials** and **manage**.
  - Inside collections Articles are grouped in **categories**.
    eg : A **_materials/chip-seals/my_article.md** file will be in **Materials Collection** and in **Cheap Seals Categorie**.
    And his **URL** will be **/kb/materials/cheap-seals:my-article/**.
  - Technically, the category is affected to articles by **_plugins/hook-collection-category-from-path.rb**. See this file for documentation.
  - Articles can have one type (article, video, link, project or research)
  - An Article can have one to many **tags**.

#### Creating an Article

Article management **must** be done through Forestry.io CMS (see [see documentation](/documentation/070-forestry.io-cms/)).

#### Manage Knowledge Base Collections

If you want to add a collection to KB :

 - in _config.yml, add a new collection and its default configuration

{% highlight yaml %}
collections:
  [...]
  collection-name:
    output: true  # creates a page for each article in the collection
    isKB: true    # used to easily find KB collections with liquid
                  # eg : {% assign kb = site.collections | where: "isKB", "true" %}
    name: "Collection Name"  # display name
    permalink: "/kb/:path/"

defaults:
  [...]
  # default config for knowledge base
  [...]
  -
    scope:
      type: "collection-name"
    values:
      layout: "kb_collection_item"
      isKBDocument: true

{% endhighlight %}

 - create a new **_collection-name** folder

 - in this folder, create categories folders

 - edit collection's categories (see bellow)

#### Manage collection's Categories

If you want to add a category to a KB collection :

  - create a folder in collection. (eg : for **_collection-name** example, we can create a **_collection-name/category-name** folder)

  - edit **data/kb_setup/kb_categories.yml**

  - add an entry for your category
{% highlight yaml %}
collection-name:
    - { name: "Category Name", slug: category-name }
{% endhighlight %}


#### Manage article Types

### Agenda

<hr>

## WIP


### Add the category to *data/kb_setup.yml* under `kb_categories` configuration key.


``` yaml
kb_categories
  methods:
    - { name: "Fog Seals", slug: fog-seals }
```

Here we've added the **Fog Seals** category to the methods collection.
Category name is used for presentation and **slug** is used for path and url generation.

Note that the generated url will be **methods/fog-seals/articleTitle/**.
It's then important to give meaningful slug to categories and to avoid abbreviations.

### Create a folder for this category

We then create a **_methods/fog-seals** folder.

### Create a default configuration rule for this category.

Add `- { scope: { path: "methods/fog-seals" }, values:  { category: "fog-seals" } }` in :

{% highlight yaml %}
defaults:
  # default layout for collections articles
[...]

# assign a default category to any item in a given folder
  - { scope: { path: "methods/fog-seals" }, values:  { category: "fog-seals" } }
{% endhighlight %}

Any article file in **_methods/fog-seals** folder will see its category set to **fog-seals**.

### Create the Category index page

Create `methods/fog-seals.md` page containing :

{% highlight yaml %}
{% raw %}
---
---
{% include components/category-page.html %}
{% endraw %}
{% endhighlight %}

