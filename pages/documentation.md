---
title: Documentation
menu: footer
weight: 30
permalink: /documentation/
---

{% assign documentation = site.collections | where: "label", "documentation" | first %}
{% assign docs = documentation.docs %}
<ul class="list-unstyled">
{% for d in docs %}
  <li>
    <h4><a href="{{ site.baseurl }}{{ d.url }}">{{ d.title }}</a></h4>
  </li>
{% endfor %}
</ul>
