---
title: Netlify
---

## Using Netlify

### Deploys Setup

https://www.netlify.com/docs/continuous-deployment/

netlify.toml file

### Connecting to Algolia API

https://community.algolia.com/jekyll-algolia/netlify.html

### HTTP headers

[Following Mozilla Web Security Cheat Sheet](https://infosec.mozilla.org/guidelines/web_security)

 - **https** : done by Netlify with Let's Encrypt free certificate [see Netify doc](https://www.netlify.com/docs/ssl/)

 - **Redirections from HTTP** :  Done by Netlify `307 Internal Redirect` and `Non-Authoritative-Reason: HSTS`

 - **Resource Loading** : verified in development and enforced by browsers

 - **HTTP Strict Transport Security (HSTS)** and **Content Security Policy (CSP) ** : see **_headers** file

