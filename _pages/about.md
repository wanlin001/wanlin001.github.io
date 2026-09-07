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

<!-- 一則消息 = _news/ 底下一個 .md 檔。詳見 README -->

{% assign items = site.news | sort: "date" | reverse %}
{% if items.size > 0 %}
<ul class="news" id="news-list">
{% for n in items %}
  {% assign target = n.link | default: n.url %}
  {% assign clickable = true %}
  {% unless n.link %}{% if n.content == blank %}{% assign clickable = false %}{% endif %}{% endunless %}
  <li class="news__item{% if forloop.index > 5 %} news__item--extra{% endif %}"{% if forloop.index > 5 %} hidden{% endif %}>
    <span class="news__mark">
      {% if n.image %}<span class="news__thumb" style="background-image:url('{{ n.image }}');"></span>
      {% else %}<i class="{{ n.icon | default: 'fas fa-circle-dot' }}" aria-hidden="true"></i>{% endif %}
    </span>
    <time class="news__date" datetime="{{ n.date | date: '%Y-%m-%d' }}">{{ n.date | date: "%d %b %Y" }}</time>
    <span class="news__title">
      {% if clickable %}<a href="{{ target }}"{% if target contains '://' %} target="_blank" rel="noopener"{% endif %}>{{ n.title }}</a>
      {% else %}{{ n.title }}{% endif %}
    </span>
  </li>
{% endfor %}
</ul>
{% if items.size > 5 %}
<button type="button" class="news-more" id="news-more"
        data-more="See {{ items.size | minus: 5 }} more" data-less="Show less">See {{ items.size | minus: 5 }} more</button>
{% endif %}
{% endif %}

Guides
======

<!-- 內容在 _data/home.yml 的 guides 清單 -->

{% if site.data.home.guides.size > 0 %}
<div class="guide-grid">
{% for g in site.data.home.guides %}
  <a class="guide" href="{{ g.url }}"{% if g.url contains '://' %} target="_blank" rel="noopener"{% endif %}>
    <span class="guide__icon"><i class="{{ g.icon | default: 'fas fa-arrow-right' }}" aria-hidden="true"></i></span>
    <span class="guide__title">{{ g.title }}</span>
  </a>
{% endfor %}
</div>
{% endif %}

What I am working on now
------


* **Intraslab stress heterogeneity** and faulting in thinned continental lithosphere.
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
