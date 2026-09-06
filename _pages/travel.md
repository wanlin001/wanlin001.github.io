---
layout: single
title: "Travel"
permalink: /travel/
author_profile: true
toc: true
toc_label: "Trips"
---

<!-- {% raw %}
═══════════════════════════════════════════════════════════════════════════
  加一趟旅行 — 複製下面這個「基本款」，改成自己的內容就好
  （這整段是註解，不會出現在網頁上。頁面上的文字請用英文）

  ── 基本款：標題 + 時間地點 + 地圖 ──────────────────────────────────────

  {% include trip.html title="Trip name" when="May 2026" place="Somewhere, Italy"
                       lat="46.2672" lon="12.3293" %}

  地圖有兩種寫法，二選一：
    lat/lon = "46.2672" / "12.3293"     單一地點。座標在 Google Maps 上對著
                                        地點按右鍵，第一列就是。可再加
                                        span="0.055" 調整看多大範圍
    mid     = "182NqsK3rnf..."          自己做的 Google My Maps。網址裡 mid=
                                        後面那串。地圖要設成公開分享
    兩個都不寫 → 就沒有地圖

  ── 底下自由發揮，一般 Markdown ─────────────────────────────────────────

  文字      直接打。**粗體**、*斜體*、[連結](網址)
  小標題    標題文字，下一行打 ------

  照片      {% include photos.html dir="/images/travel/資料夾" files="1.jpg, 2.jpg" %}
            加說明：captions="第一張, 第二張"  整組說明：caption="..."
            照片放在 images/travel/ 底下，一趟旅行開一個資料夾

  連結卡    {% include link-card.html title="標題" url="https://..." source="Medium"
                                      date="2026" excerpt="一句說明" %}

  照片會在 commit 時自動壓縮，不用先處理。
═══════════════════════════════════════════════════════════════════════════
{% endraw %} -->

Trips, trails and the places the rocks took me.


{% include trip.html title="Vajont Dam" when="May 2026"
                     place="Erto e Casso and Longarone, Italy"
                     lat="46.2672" lon="12.3293" span="0.055"
                     caption="The two photographs were taken upstream on the Monte Toc side and downstream at Longarone" %}

On 9 October 1963 about 270 million cubic metres of Monte Toc slid into the reservoir. The dam
held; the wave did not. Sixty years on the slide surface is still bare, and from Longarone
station the gorge frames the dam wall almost exactly.

{% include photos.html dir="/images/travel/vajont" files="20260516_152714_monte-toc.jpg, 20260516_184330_longarone.jpg" captions="The Monte Toc slide surface, The gorge seen from Longarone" %}

Written up in more detail in [this note](/news/2026-05-16-vajont/).


{% include trip.html title="Nepal — Himalaya" when="Nov 2022"
                     place="Pokhara, Mustang and the Kali Gandaki valley"
                     mid="182NqsK3rnf44xUX4dDm4nh-JwxQ-F40"
                     caption="2022 HKT workshop field trip" %}

The HKT Workshop in Pokhara, then a run along the Main Frontal Thrust and up the Kali Gandaki
valley into Mustang.

<!-- 照片放進 images/travel/nepal/ 之後，把這一行的註解符號拿掉就會出現
{% raw %}{% include photos.html dir="/images/travel/nepal" files="1.jpg, 2.jpg, 3.jpg" %}{% endraw %}
-->


{% include trip.html title="Sumatra — Aceh" when="2022"
                     place="Banda Aceh, Indonesia"
                     lat="5.5483" lon="95.3238" span="0.35" %}

The Aceh segment of the Great Sumatran Fault, and Banda Aceh twenty years after the 2004
tsunami.

{% include link-card.html
   title="災難之島 —— 北蘇門答臘的地質旅遊：班達亞齊"
   url="https://twgeoref.gsmma.gov.tw/GeoWeb/cp.do?action=cp&kt=2748&xItem=312647&ctNode=217&mp=6"
   source="地質 Ti-Chi"
   date="2024 · in Mandarin"
   excerpt="How the wreckage was preserved and turned into a destination, and how a society lives alongside catastrophe." %}
