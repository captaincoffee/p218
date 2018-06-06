---
title:  Documentation
menu: footer
weight: 20
permalink: documentation/
---
{% assign doc = site.pages | where: "isDoc", true %}

<ul>
{% for p in doc %}
  <li><a href="{{ site.baseurl }}{{ p.url }}">{{ p.title }}</a></li>
{% endfor %}
</ul>
