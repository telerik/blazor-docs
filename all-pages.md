---
published: false
layout: null
---

{% capture site_url %}{% if site.url %}{{ site.url }}{% else %}{{ site.github.url }}{% endif %}{% endcapture %}
{% for post in site.html_pages %}
{{ site.all_pages_domain }}/blazor-ui{{ post.url | replace:'.html','' }}
{% endfor %}
