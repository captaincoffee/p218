---
title: Pavement Preservation (P2) Information Architecture (IA)
---

## Website structure
* A markdown unordered list which will be replaced with the ToC, excluding the "Contents header" from above
{:toc}

 - News
 - Agenda
 - Pavement Preservation Knowledge Base
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








### Knowledge Base

KB base element is a collection's file, and we call it **article**

Articles are grouped in **collections**, then in **categories**.

KB collections are configured to have an isKB variable set to true.

    collections:
      methods:
        output: true
        isKB: true
        name: "Methods"
        permalink: "/kb/:path/"

Getting all kb collections can be done with :
{% highlight liquid %}
{%- raw -%}
{%- assign kbCollections = site.collections | where: "isKB", "true" -%}
{%- endraw -%}
{% endhighlight %}


#### Creating an Article

#### Creating a category

#### Creating a new collection in kb

### Agenda

<hr>

## WIP

## Pavement Preservation Knowledge Base

### Knowledge base organization
Base KB's element is **article**.

**Articles** are organized in **collection** : **methods**, **materials** and **manage**.

An **article** can be from one **category** (eg : Fog Seals, Chip Seals, Spray Seals, ... ). Each collection has is own categories (see **categories** paragraph for more informations).

An **article** can be from one type (**article**, **video**, **link**, **project** or **research**).

An **article** can have one to many **tags**.

## Collections organization

We have three **collections** used to display **articles** : **methods**, **materials** and **manage**.

They are usual Jekyll collections.

### Configuration
This is the basic configuration for a collection.

{% highlight yaml %}
collections:

  methods:
    output: true   # every page in the collection will be created
    isKB: true     # is part of Knowledge base
    name: "Methods" # Print name used in titles, menus, ...
    categories:
      [...]
{% endhighlight %}

All articles for **methods** collections goes in a **_methods/categoryName** folder
(see **categories** paragraph for more informations).

In order to differentiate **KB** collections from other collections we set a `isKB: true` on the collection.

### Collection's index page



## Create a Category

Articles are organized in collections, then in categories inside each collection.

Article can be part of only one **category**.

Each collection has is own categories.

A category is automatically assigned depending on the folder name and default configuration rules.

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

