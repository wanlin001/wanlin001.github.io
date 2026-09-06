---
permalink: /
title: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I am a postdoctoral fellow at the **Institute of Earth Sciences, Academia Sinica** in Taipei,
working on how the crust and lithosphere deform, and on what that deformation implies for
earthquake hazard.

Earthquakes are common where I grew up, and that early exposure led me to earthquake science,
along with the belief that this science should produce knowledge people can actually use.
Before starting my PhD I spent two years as a professional geologist in an engineering
consultancy, advising government agencies on national hazard policy — an experience that still
shapes the questions I choose.

My approach is to bring methods from one field to bear on questions in another: structural
geology to resolve a geological–geodetic slip-rate discrepancy in the Himalaya, data science to
quantify interpretation uncertainty in seismic images, and geodynamic modelling combined with
earthquake source analysis to probe the strength of the continental lithospheric mantle.
Everything I publish is deposited on Zenodo with the full input files, so that every simulation
can be reproduced independently.

News
======

<!-- 內容在 _data/home.yml 的 news:，不用改下面這幾行 -->

{% if site.data.home.news.size > 0 %}
<div class="post-list">
{% for n in site.data.home.news %}
  {% if n.url %}
  <a class="post-card" href="{{ n.url }}"{% if n.url contains '://' %} target="_blank" rel="noopener"{% endif %}>
  {% else %}
  <div class="post-card post-card--static">
  {% endif %}
    {% if n.image %}<span class="post-card__thumb" style="background-image:url('{{ n.image }}');"></span>{% endif %}
    <span class="post-card__text">
      <span class="post-card__title">{{ n.title }}</span>
      {% if n.date %}<span class="post-card__meta">{{ n.date }}</span>{% endif %}
      {% if n.excerpt %}<span class="post-card__excerpt">{{ n.excerpt }}</span>{% endif %}
    </span>
  {% if n.url %}</a>{% else %}</div>{% endif %}
{% endfor %}
</div>
{% endif %}

Guides
======

<!-- 內容在 _data/home.yml 的 guides: -->

{% if site.data.home.guides.size > 0 %}
<div class="post-list post-list--guides">
{% for g in site.data.home.guides %}
  <a class="post-card" href="{{ g.url }}"{% if g.url contains '://' %} target="_blank" rel="noopener"{% endif %}>
    {% if g.image %}<span class="post-card__thumb" style="background-image:url('{{ g.image }}');"></span>{% endif %}
    <span class="post-card__text">
      <span class="post-card__title">{{ g.title }}{% if g.date %} <span class="post-card__meta post-card__meta--inline">{{ g.date }}</span>{% endif %}</span>
      {% if g.excerpt %}<span class="post-card__excerpt">{{ g.excerpt }}</span>{% endif %}
    </span>
  </a>
{% endfor %}
</div>
{% endif %}

What I am working on now
------


* **Intraslab stress heterogeneity** and faulting in thinned continental lithosphere.
* **Fault weakening and heterogeneity** — coupled thermo-hydro-mechanical-chemical (THMC)
  processes in exhumed fault zones, bridging outcrop observation and numerical models.

* **Slab–slab interaction** in the Manila–Taiwan–Ryukyu subduction system, linking 3-D mantle
  flow to observed seismic anisotropy.
  
Elsewhere
------

Outside the office I am usually on a trail, in an outcrop, or somewhere between the two — see
[Fieldwork](/fieldwork/) and [Photos](/photos/).

<!-- 想在首頁放幾張照片，把圖片丟進 images/about/ 再把這一段的註解拿掉：
{% raw %}{% include photos.html dir="/images/about" files="1.jpg, 2.jpg, 3.jpg" %}{% endraw %}
-->

Contact
------

huwanlin@earth.sinica.edu.tw · Institute of Earth Sciences, Academia Sinica, 128 Academia Road
Section 2, Nangang, Taipei 115201, Taiwan
