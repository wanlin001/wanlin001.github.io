---
layout: single
title: "Resources"
permalink: /resources/
author_profile: true
toc: true
toc_label: "On this page"
---

Code, data and links I keep coming back to — plus things I have written for a general audience.

Code & data from my papers
======

Every published model comes with its full input deck, archived so that the simulation can be
re-run independently.

* **Zenodo** — model inputs and processing scripts [Zenodo](https://zenodo.org/me/uploads?q=&f=shared_with_me%3Afalse&l=list&p=1&s=10&sort=newest)
* **GitHub** — [github.com/wanlin001](https://github.com/wanlin001)

Software I use
======

| | |
|---|---|
| [ASPECT](https://aspect.geodynamics.org/) | Mantle convection & lithosphere dynamics (deal.II) |
| [DynEarthSol](https://bitbucket.org/tan2/dynearthsol3d) | Explicit finite-element crustal deformation |
| [MOOSE](https://mooseframework.inl.gov/) | Multiphysics FEM, coupled THM(C) problems |
| [GMT](https://www.generic-mapping-tools.org/) | Mapping and figures |
| [ParaView](https://www.paraview.org/) / [VisIt](https://visit-dav.github.io/visit-website/) | 3-D visualisation |
| [ObsPy](https://docs.obspy.org/) | Seismological data handling |
| [QGIS](https://qgis.org/) | GIS |

Writing for a general audience
======

My Mandarin-language science writing is listed on the
[publications page](/publications/#outreach).

Notes
======

{% assign feed_posts = site.data.posts.posts %}
{% if site.data.notes.notes.size > 0 or feed_posts.size > 0 %}
<div class="post-list">
{% for note in site.data.notes.notes %}
  <a class="post-card" href="{{ note.url }}" target="_blank" rel="noopener">
    {% if note.image %}<span class="post-card__thumb" style="background-image:url('{{ note.image }}');"></span>{% endif %}
    <span class="post-card__text">
      <span class="post-card__title">{{ note.title }}</span>
      <span class="post-card__meta">{{ note.source }}{% if note.date %} · {{ note.date }}{% endif %}</span>
      {% if note.excerpt %}<span class="post-card__excerpt">{{ note.excerpt }}</span>{% endif %}
    </span>
  </a>
{% endfor %}
{% for post in feed_posts limit: 6 %}
  <a class="post-card" href="{{ post.url }}" target="_blank" rel="noopener">
    {% if post.image %}<span class="post-card__thumb" style="background-image:url('{{ post.image }}');"></span>{% endif %}
    <span class="post-card__text">
      <span class="post-card__title">{{ post.title }}</span>
      <span class="post-card__meta">{{ post.source }}{% if post.date_display %} · {{ post.date_display }}{% endif %}</span>
      {% if post.excerpt %}<span class="post-card__excerpt">{{ post.excerpt }}</span>{% endif %}
    </span>
  </a>
{% endfor %}
</div>
{% endif %}

For students
======

Notes and links I share with students I mentor — on scientific writing, on running models on an
HPC cluster, and on applying for graduate study abroad.
*(Add posts or PDF links here as you write them.)*
