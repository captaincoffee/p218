---
title: Documentation
menu: footer
weight: 30
permalink: /documentation/
---

<h1>Documentation</h1>
{% assign documentation = site.collections | where: "label", "documentation" | first %}
{% assign docs = documentation.docs %}
<ul>
{% for d in docs %}
  <li>
    <h3><a href="{{ site.baseurl }}{{ d.url }}">{{ d.title }}</a></h3>
  </li>
{% endfor %}
</ul>
