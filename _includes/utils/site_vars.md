{% comment %}
 ### see _config_dev.yml for variables lists
{% endcomment %}

<ul>
{% for prop in site %}
  <li>
  {% if site.site_vars_NOT_to_print contains prop %}
  <strong>NOT PRINTING</strong> site.{{ prop }}
  {% else %}
    <strong>site.{{ prop }} :</strong>
    {% if site[prop].first %}
      <ul>
      {% for element in site[prop] %}<li>{{ element | inspect }}</li>{% endfor %}
      </ul>
    {% else %}
      {{ site[prop] | inspect }}
    {% endif %}
  {% endif %}
  </li>
{%- endfor %}
</ul>