{%- comment %}
# headers file for netlify
# doc : https://www.netlify.com/docs/headers-and-basic-auth/
# test : https://play.netlify.com/headers
# references : https://infosec.mozilla.org/guidelines/web_security
#              https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/
{% endcomment -%}

/*
  X-Content-Type-Options: "nosniff"

  # deprecated in favor of CSP frame-ancestors
  # X-Frame-Options: deny

  X-XSS-Protection: 1; mode=block

  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

{%- comment %}
  # generator : https://report-uri.com/home/generate
{%- endcomment %}

  Content-Security-Policy: default-src *.{{ site.host }};

{%- comment %}
  Content-Security-Policy: base-uri {{ site.host }};

  Content-Security-Policy: connect-src *.{{ site.host }} *.algolia.net;
  Content-Security-Policy: object-src 'none' ;

  Content-Security-Policy: frame-src youtube.com;
  Content-Security-Policy: frame-ancestors 'none' ;

  Content-Security-Policy: upgrade-insecure-requests;
  Content-Security-Policy: block-all-mixed-content;

  Content-Security-Policy: reflected-xss filter;

  Content-Security-Policy: disown-opener;
  Content-Security-Policy: referrer no-referrer;
{% endcomment -%}

