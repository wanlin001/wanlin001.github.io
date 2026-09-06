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

* **Zenodo** — model inputs and processing scripts *(add your Zenodo community/DOI links here)*
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

Talks & outreach
======

* 2025 — Science communicator, Academia Sinica Open House (elementary-school programme)
* 2024 — Invited speaker, Taipei City Library Study Abroad Resource Centre:
  *"Fallen into a rabbit hole — navigating challenges as an international student"*
* 2021 — First place, Three Minute Thesis (3MT), Asian School of the Environment, NTU Singapore

Blog posts
======

{% if site.data.posts.posts and site.data.posts.posts.size > 0 %}
<div class="post-list">
{% for post in site.data.posts.posts limit: 6 %}
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
{% else %}
*Nothing here yet — see [README §14](https://github.com/wanlin001/wanlin001.github.io#14-把-medium-文章拉進網站) for how to pull in a Medium or Substack feed.*
{% endif %}

For students
======

Notes and links I share with students I mentor — on scientific writing, on running models on an
HPC cluster, and on applying for graduate study abroad.
*(Add posts or PDF links here as you write them.)*
