---
layout: single
title: "Resources"
permalink: /resources/
author_profile: true
toc: true
toc_label: "On this page"
---

Code, data and links I keep coming back to. Working notes and checklists live on the
[Notes page](/notes/).

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
| [DynEarthSol](https://github.com/GeoFLAC/DynEarthSol) | Explicit finite-element crustal deformation |
| [MOOSE](https://mooseframework.inl.gov/) | Multiphysics FEM, coupled THM(C) problems |
| [GMT](https://www.generic-mapping-tools.org/) | Mapping and figures |
| [ParaView](https://www.paraview.org/) / [VisIt](https://visit-dav.github.io/visit-website/) | 3-D visualisation |
| [ObsPy](https://docs.obspy.org/) | Seismological data handling |
| [QGIS](https://qgis.org/) | GIS |

Writing for a general audience
======

My Mandarin-language science writing is listed on the
[publications page](/publications/), marked *Outreach*.


Talks & slides
======

<!-- {% raw %}
  加一份簡報：PDF 放進 files/talks/，檔名用「日期-英文短名.pdf」，
  然後在最上面複製一組 include（新的放最上面）：

  {% include link-card.html
     title="簡報標題"
     url="/files/talks/2026-01-01-short-name.pdf"
     source="在哪裡講的"
     date="1 Jan 2026 · in Mandarin · PDF"
     excerpt="一句英文說明" %}

  不是 PDF 而是線上簡報（Google Slides、SlideShare…）就把 url 換成網址，
  date 裡的「· PDF」拿掉。PDF 超過 10 MB 先壓縮（見 README）。
{% endraw %} -->

{% include link-card.html
   title="Fallen into a Rabbit Hole — 談國際學生面對留學困境及解套方式"
   url="/files/talks/2024-02-25-study-abroad-talk.pdf"
   source="Study Abroad Resource Centre, Taipei Public Library"
   date="25 Feb 2024 · in Mandarin · PDF"
   excerpt="Public lecture with 郭思廷 on what international students run into abroad, the survival bias in success stories, and where to find help. Your wellbeing is what really matters." %}


For students
======

<!-- {% raw %}
  加一個外部資源：複製下面這組 include，換掉 title / url / source / excerpt。
  網址後面如果有 ?fbclid=… 或 ?utm_… 這類追蹤碼，整段刪掉再貼。
{% endraw %} -->

{% include link-card.html
   title="研究生生存指南：把研究做完，更要把自己找回來"
   url="https://deck.researcher.tw/decks/grad-student-survival-guide/"
   source="researcher.tw"
   date="in Mandarin · slides"
   excerpt="A 100-slide guide to graduate school: the system, supervisors, reading and writing, time, money, mental health, isolation, AI, and ways out — plus a start-of-term checklist." %}
