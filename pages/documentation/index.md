---
title:  Documentation Home
menu: footer
weight: 20
permalink: /documentation/
layout: default
---
{% assign doc = site.pages | where: "isDoc", true %}

<ul>
{% for p in doc %}
  <li>
    <h3><a href="{{ site.baseurl }}{{ p.url }}">{{ p.title }}</a></h3>

    {{ p.excerpt }}

  </li>
{% endfor %}
</ul>
