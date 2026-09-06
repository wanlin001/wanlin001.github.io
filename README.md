# wanlin001.github.io — 個人網站維護筆記

給自己看的操作手冊。基底是 [AcademicPages](https://github.com/academicpages/academicpages.github.io)（Jekyll，Minimal Mistakes 的 fork），已大幅精簡並客製。

---

## 目錄

**開始之前**

- [網站架構](#網站架構) — 檔案分成哪三堆、哪些能碰哪些不能
- [1. 發布前一定要知道的兩件事](#1-發布前一定要知道的兩件事) — commit 不等於 push；網站從哪個分支發布
- [2. 本機預覽](#2-本機預覽) — 改完先在自己電腦上看，別直接推上去
- [3. 檔案速查表](#3-檔案速查表) — 想改 X → 改哪個檔；圖片和 PDF 放哪
- [4. 列出目前的分類與標籤](#4-列出目前的分類與標籤) — 一行指令印出全部，還有 YAML 格式檢查
- [4b. 首頁的 News 與 Guides](#4b-首頁的-news-與-guides) — 首頁那兩個清單在哪裡加、可以加圖

**加內容**

- [5. 加一篇論文](#5-加一篇論文) — front matter 欄位、按鈕怎麼自動長出來、metric 圈圈
- [5b. PDF 與研討會清單](#5b-pdf-與研討會清單) — PDF 放哪、怎麼壓縮；研討會發表寫在哪
- [5c. CV 的機構連結與圖示](#5c-cv-的機構連結與圖示) — link 和 icon 掛在哪一行、怎麼暫時隱藏
- [6. 標籤的名稱與顏色](#6-標籤的名稱與顏色) — 論文和 Notes 共用一份標籤；點標籤篩選
- [7. 加一個新分區](#7-加一個新分區) — 論文頁的新區塊，或頁面裡的新章節
- [8. 加一個新頁面與選單按鈕](#8-加一個新頁面與選單按鈕) — 兩步：建 .md、加進 navigation.yml
- [9. 下拉選單](#9-下拉選單) — 用 children: 做子選單，怎麼改回單層
- [10. Notes 與 Travel 的積木](#10-notes-與-travel-的積木) — Notes 的分類與欄位；照片、地圖、連結卡三個 include
- [11. 照片牆](#11-照片牆) — photo-grid 怎麼用
- [11b. 照片牆](#11b-照片牆) — 一整頁的照片牆，滑過去顯示說明，點開看大圖
- [11c. 圖片自動壓縮](#11c-圖片自動壓縮) — commit 時自動縮圖；**換電腦要重跑一行設定**
- [12. Google My Maps](#12-google-my-maps) — embed 網址怎麼組，為什麼地圖會是空白的
- [13. 把外部文章放進網站](#13-把外部文章放進網站) — HackMD / Medium 三種做法，能不能直接嵌

**設定**

- [14. 訪客統計](#14-訪客統計) — GoatCounter / Cloudflare / GA4，本機預覽不列入
- [15. 分支設定](#15-分支設定) — main 和 master 的坑，main already existed 怎麼辦
- [16. 自訂網域](#16-自訂網域) — 買網域之後的 DNS 設定與四個常見坑

**維護**

- [17. 已經做過的客製](#17-已經做過的客製) — 動過哪些佈景檔案、為什麼，別不小心改回去
- [18. 待辦清單](#18-待辦清單) — 還沒補的東西
- [19. 出事了怎麼辦](#19-出事了怎麼辦) — 改壞了怎麼還原、怎麼救回刪掉的檔案

---

## 網站架構

網站的原理只有一句話：**妳寫內容 → Jekyll 套版 → 變成 HTML → GitHub 幫妳放到網路上。**
所以檔案分成三堆：**內容**（常改）、**設定**（偶爾改）、**引擎**（不要碰）。

```
huwanlin/
│
├── ✏️ 內容 —— 平常就是改這些
│   ├── _pages/                  一個檔 = 一個頁面
│   │   ├── about.md                首頁（About me）
│   │   ├── research.md             Research
│   │   ├── fieldwork.md            Fieldwork（含 Google 地圖）
│   │   ├── resources.md            Resources
│   │   ├── publications.html       論文列表（版型，內容在 _publications/）
│   │   ├── cv.html                 CV（版型，內容在 _data/cv.yml）
│   │   └── 404.md / sitemap.md     很少動
│   │
│   ├── _publications/           一個檔 = 一篇論文（含中文科普）
│   ├── images/                  所有圖片
│   └── files/                   PDF、投影片、CV
│
├── ⚙️ 設定 —— 偶爾改
│   ├── _config.yml              網站標題、側欄資料、論文分區
│   └── _data/
│       ├── navigation.yml          上方選單（含下拉選單）
│       ├── cv.yml                  CV 的實際內容
│       ├── topics.yml              研究領域標籤的名稱與顏色
│       ├── notes.yml               外部文章清單（HackMD/Medium…，手寫）
│       └── posts.yml               自動抓的部落格文章（程式產生，別手改）
│
├── 🎨 外觀 —— 想調樣式才改
│   └── assets/css/custom.css    所有客製樣式（配色、卡片、標籤、下拉選單）
│
└── 🔒 引擎 —— 不要碰
    ├── _includes/  _layouts/  _sass/     佈景的內部零件
    ├── assets/（custom.css 以外）        佈景的 CSS/JS/字型
    ├── Gemfile / Dockerfile / .devcontainer/   環境設定
    ├── .github/workflows/                自動化（build 檢查、抓 RSS）
    └── scripts/                          小工具程式
```

> 三個例外：`_includes/masthead.html`（下拉選單）、`_includes/head/custom.html`（載入 custom.css）、
> `_layouts/default.html`（頁尾那行 Last updated）——這三個已經改過了，除非要動選單或頁尾，否則別碰。

### 90% 的情況只會用到這五個地方

| 我想… | 改這個 |
|---|---|
| 改文字 | `_pages/` 裡對應的 `.md` |
| 加論文 | `_publications/` 新增一個 `.md` |
| 改 CV | `_data/cv.yml` |
| 改選單 | `_data/navigation.yml` |
| 改顏色 | `assets/css/custom.css` 最上面的 `--wl-accent` |
| 加 HackMD / 部落格文章 | `_data/notes.yml` |

### 檔案有兩種寫法

- **`.md`（Markdown）** —— 純文字，`**粗體**`、`[連結](網址)`、`* 清單`。**大部分頁面都是這種。**
- **`.html`** —— 需要「自動列出一堆東西」時才用（論文列表、CV timeline）。這種頁面的**內容**都被抽到 `_data/` 的 YAML 裡了，所以妳還是不用寫 HTML。

每個檔案最上面用 `---` 包起來的那幾行叫 **front matter**，是給 Jekyll 看的設定（標題、網址、分類）。`---` 底下才是正文。

---

## 1. 發布前一定要知道的兩件事

### （1）改完要 push，網站才會變

```bash
cd ~/Documents/GitHub/huwanlin
git add -A
git commit -m "說明改了什麼"
git push
```

push 後等 **1–3 分鐘**，GitHub 自動重新 build。進度看 repo 的 **Actions** 分頁。

**這個環境會自動幫妳 commit，但不會自動 push。** 所以線上沒變的話，先跑 `git push`。
想確認有沒有東西卡著：

```bash
git log --oneline origin/main..main      # 有列出東西 = 還沒 push
```

### （2）⚠️ 為什麼「我自己改都不會更新」

這個 repo 有 **兩個分支**：

| 分支 | 用途 |
|---|---|
| `main` | 妳工作的分支，`git push` 預設推這裡 |
| `master` | **GitHub Pages 實際發布的分支** |

**推到 `main` 網站不會變** —— 一定要 `master` 也更新。這就是為什麼妳改了半天線上沒動。

**已經幫妳設定好了**，現在 `git push` 會同時推兩個分支：

```bash
git config --get-all remote.origin.push
#   refs/heads/main:refs/heads/main
#   refs/heads/main:refs/heads/master
```

⚠️ **換電腦或重新 clone 之後，這兩行要再跑一次**（跟圖片壓縮的 hook 一樣，設定不會跟著 git 走）：

```bash
cd ~/Documents/GitHub/huwanlin
git config --add remote.origin.push refs/heads/main:refs/heads/main
git config --add remote.origin.push refs/heads/main:refs/heads/master
```

**更乾淨的一勞永逸解法**（做一次就不用管上面那些）：

1. GitHub → `Settings` → `Pages` → `Build and deployment` → Branch 改成 **`main`** → Save
2. `Settings` → `General` → Default branch 改成 **`main`**
3. 確認網站正常後，把 `master` 分支刪掉，再把上面那兩行 config 清掉：
   `git config --unset-all remote.origin.push`

### 怎麼確認到底哪裡卡住

```bash
git fetch origin
git log --oneline origin/main..main       # 空的 = main 已同步
git rev-parse --short main origin/main origin/master   # 三個一樣 = 都同步了
```

三個 hash 一樣，網站又沒變，那才是 build 出錯 —— 去 Actions 分頁看紅字。

---

## 2. 本機預覽

```bash
cd ~/Documents/GitHub/huwanlin && bundle exec jekyll serve --port 4321
```

開 <http://localhost:4321/>。存檔會自動重新編譯，重整就看到。

> ⚠️ **改 `_config.yml` 或 `_data/*.yml` 要按 Ctrl+C 停掉、重跑指令**，否則不會生效。
> 其他檔案（`.md` / `.html` / `.css`）存檔即生效。

停止：在該終端機按 `Ctrl+C`。

---

## 3. 檔案速查表

| 我想改… | 改這個檔 |
|---|---|
| **配色、卡片樣式、標籤外觀** | **`assets/css/custom.css`** ← 所有客製 CSS 都在這 |
| 主色（綠色） | `assets/css/custom.css` 最上面的 `--wl-accent` |
| 首頁 About | `_pages/about.md` |
| Research | `_pages/research.md` |
| Fieldwork 野外地圖 | `_pages/fieldwork.md` |
| Resources | `_pages/resources.md` |
| CV **內容** | `_data/cv.yml` ← 純 YAML，不用碰 HTML |
| CV 機構連結、小圖示 | `_data/cv.yml` 每一筆加 `link:` 和 `icon:`（見下）|
| 論文 PDF、投影片 | 丟進 `files/`，在論文 front matter 寫 `paperurl:` |
| CV **版型** | `_pages/cv.html` |
| 論文清單**版型** | `_pages/publications.html` |
| 單篇論文 | `_publications/*.md` |
| **研究領域標籤（顏色/名稱）** | `_data/topics.yml` |
| **HackMD / 部落格文章連結** | `_data/notes.yml` |
| 論文分區（Journal / In prep / 科普…） | `_config.yml` 的 `publication_category` |
| 上方選單 | `_data/navigation.yml` |
| 側欄個人資料、社群連結、網站標題 | `_config.yml` 的 `author:` 區塊 |
| 頁尾「Last updated」那行 | `_layouts/default.html` 和 `_layouts/cv-layout.html` |

**圖檔 / 檔案放哪：**

| 東西 | 資料夾 | 網頁上的路徑 |
|---|---|---|
| 側欄大頭照 | 覆蓋 `images/profile.png` | — |
| About 頁照片 | `images/about/` | `/images/about/xxx.jpg` |
| 野外照片 | `images/fieldwork/` | `/images/fieldwork/xxx.jpg` |
| Research 插圖 | `images/research/` | `/images/research/xxx.png` |
| PDF、投影片、CV | `files/` | `/files/xxx.pdf` |

照片建議：JPEG、長邊 ≤1600 px、每張 ≤500 KB。

---

## 4. 列出目前的分類與標籤

跑這行，會把所有標籤、Notes 的章節分類、論文的分區全部列出來，
連「各被用了幾次」「定義了但沒用到」都會標出來：

```bash
cd ~/Documents/GitHub/huwanlin && ruby scripts/list_labels.rb
```

輸出長這樣：

```
TAGS  ── edit _data/topics.yml ──────────────────────────
  code           label                  colour    used_by
  geodynamics    Geodynamics            #c0392b   3 pub
  gear           Gear                   #0d9488   — (unused)

NOTES SECTIONS  ── edit `categories:` in _data/notes.yml ─
  hiking         Hiking                 2 note(s)
  research       Research notes         5 note(s)

PUBLICATION SECTIONS  ── edit `publication_category:` in _config.yml ─
  manuscripts    Peer-reviewed journal articles   5 item(s)
```

`_data/notes.yml`、`_data/topics.yml`、`_config.yml` 三個檔的最上面也都寫了
「想改什麼 → 去哪改」的對照表，打開檔案第一眼就看得到。

同一支程式最後會做四項檢查，有問題會列出來：

```
CHECKS  ── 發現 2 個問題 ⚠️
  · topics 寫成字串: 兩日以上登山裝備清單  →  改成  topics: [checklist]
  · 標籤 "geology" 沒有定義在 _data/topics.yml（會顯示成灰色原始字）
```

檢查的是：`topics` 有沒有寫成清單、標籤有沒有定義、`category` 有沒有打錯、
以及有沒有定義了卻沒用到的標籤。

> ⚠️ **`topics` 一定要用方括號**：`topics: [checklist]`，不是 `topics: checklist`。
> 寫成字串的話卡片上看起來正常，但**只能放一個標籤**，而且以後很容易出錯。

**改完 YAML，推上去前先驗格式**（印出 OK 就沒問題，有錯會告訴妳第幾行）：

```bash
cd ~/Documents/GitHub/huwanlin && ruby -ryaml -e 'YAML.load_file("_data/notes.yml"); puts "OK"'
```

---

## 4b. 首頁的 News 與 Guides

首頁 <https://wanlin001.github.io/> 有兩塊，資料分別在不同地方。

### News —— 一則消息 = `_news/` 底下一個 `.md` 檔

版面是一行一則：**符號或小圖 · 日期 · 一行標題**。

**只是一句話的消息**（點下去連到站內或站外某處）：

```markdown
---
title: "Postdoctoral Paper Award, NSTC Taiwan"
date: 2026-06-16
icon: "fas fa-award"
link: /cv/#awards--funding
---
```

檔名建議 `年-月-日-短名.md`，例如 `2026-06-16-nstc-award.md`。

**想寫成一整篇**（文字 + 照片，有自己的頁面）：**不要寫 `link:`**，改在 `---` 底下寫內容：

```markdown
---
title: "Fieldwork at the Vajont Dam"
date: 2026-05-16
icon: "fas fa-mountain"
image: /images/travel/vajont/20260516_152714_monte-toc.jpg
---

這裡開始寫，一般 Markdown。

{% raw %}{% include photos.html dir="/images/travel/vajont" files="1.jpg, 2.jpg" %}{% endraw %}
```

標題就會連到 `/news/2026-05-16-vajont/`，那是一個完整的頁面。

| 欄位 | 說明 |
|---|---|
| `title` | 一行標題 ← 必填 |
| `date` | `YYYY-MM-DD` ← 必填，決定排序（新的在上）|
| `icon` | 左邊的小符號，Font Awesome 名稱。不寫用預設圓點 |
| `image` | 左邊改放小圖（會蓋掉 icon）。建議用現成的照片 |
| `link` | 有寫 → 標題連到這裡，內文不會產生頁面<br>沒寫 → 標題連到自己的頁面 |

**超過 5 則會自動收起來**，底下出現一個「See N more」按鈕，點了在同一頁展開，
再點一次收合。不用做任何設定。

### Guides —— 網站導覽的方塊

在 **`_data/home.yml`** 的 guides 清單：

```yaml
  - title: "Research"
    url: /research/
    icon: "fas fa-globe-asia"
```

**只有圖示和標題，沒有說明文字** —— 方塊小而整齊，自動排成網格。
圖示到 <https://fontawesome.com/search?o=r&m=free> 找，挑 Free 的，複製它的 class 名稱。

---

## 5. 加一篇論文

在 `_publications/` 新增一個 `.md`（檔名隨意，建議 `年-作者-期刊.md`）：

```yaml
---
title: "論文標題"
collection: publications
category: manuscripts        # manuscripts / inprep / conferences / outreach
permalink: /publication/2026-my-paper
date: 2026-01-01             # 決定排序（新的在上）
year: 2026
authors: 'Hu, W.-L. & Tan, E.'
venue: 'Tectonophysics'
volume: '937, 231349'
doi: '10.1016/j.tecto.2026.231349'
openaccess: true             # 有的話會顯示 Open access 標記
topics: [modelling, structural, hazard]
paperurl: '/files/mypaper.pdf'    # 本機 PDF；也可放外部網址
codeurl: 'https://zenodo.org/...'
slidesurl: 'https://...'
excerpt: '一兩句話的摘要，顯示在卡片上。'
---

這裡寫比較長的內文，點進單篇頁面才會看到。
```

**按鈕是自動長出來的**：有 `doi` 就出現 DOI 鈕、有 `paperurl` 就出現 PDF 鈕、有 `codeurl` 就出現 Code & data 鈕，沒填就不顯示。

### 為什麼有些論文沒有 metric 圖示

右上角那兩個圈圈是外部服務即時抓的，**沒有資料時會自己隱藏**（這是刻意設定的，不是壞掉）：

| 圖示 | 顯示條件 | 控制它的設定 |
|---|---|---|
| Altmetric 甜甜圈 | 有新聞／社群／政策文件提及過 | `data-hide-no-mentions="true"` |
| Dimensions 彩色圈 | 被引用次數 > 0 | `data-hide-zero-citations="true"` |

所以沒出現通常是這三種情況之一：

1. **沒有 DOI** —— 那則根本沒辦法查（例如只有 repository 連結的科普文章）
2. **DOI 有，但資料庫沒收錄** —— 例如台灣的電子報、EGU 的會議摘要
3. **太新，還沒被引用／提及** —— 過一陣子會自己冒出來，不用做任何事

想改成「就算是 0 也要顯示」：編 `_pages/publications.html`，把那兩個
`data-hide-no-mentions="true"` 和 `data-hide-zero-citations="true"` 刪掉即可。

要查某一篇現在有沒有資料，在瀏覽器開：
`https://metrics-api.dimensions.ai/doi/你的DOI`

---

## 5b. PDF 與研討會清單

### 論文 PDF 放哪

**放進 `files/`**，然後在論文的 front matter 指過去：

```bash
cp ~/某處/論文.pdf ~/Documents/GitHub/huwanlin/files/Hu-Tan-2026-Tectonophysics.pdf
```

```yaml
paperurl: '/files/Hu-Tan-2026-Tectonophysics.pdf'
```

卡片上就會多一個 **PDF** 按鈕。檔名用 `作者-年-期刊.pdf` 最好認，**不要有空格和中文**。

### ⚠️ PDF 不會自動壓縮，要手動跑

`images/` 底下的圖片 commit 時會自動壓縮，**PDF 不會** —— 期刊 PDF 動輒二三十 MB，
直接放進 git 會永久留在歷史裡，repo 越拖越慢。

```bash
gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -dColorImageResolution=200 -dGrayImageResolution=200 \
   -sOutputFile=小的.pdf 原本的.pdf
```

Tectonophysics 那篇實測：**22 MB → 3.7 MB**，16 頁完整、畫質看不出差別。

需要的話先裝 Ghostscript（只要裝一次）：

```bash
brew install ghostscript
```

檢查頁數有沒有掉：

```bash
python3 -c "import re,sys; d=open(sys.argv[1],'rb').read(); print(len(re.findall(rb'/Type\s*/Page[^s]', d)), '頁')" 小的.pdf
```

⚠️ 出版社的版權規定不一。多數期刊允許放 **accepted manuscript**，不見得允許放
**published PDF**。不確定就查 <https://openpolicyfinder.jisc.ac.uk/>，或只留 DOI。

### 研討會發表

在 **`_data/conferences.yml`**，顯示在 Publications 頁最下面，是**一行一則的細清單**，
不是厚卡片：

```yaml
conferences:

  - authors: "Hu, W.-L. & Tan, E."      # 人多就寫 "Hu, W.-L., et al."
    year: 2026
    title: "Geodynamic modelling of slab–slab interactions…"
    venue: "EGU General Assembly"
    place: "Vienna, Austria"
    doi: "10.5194/egusphere-egu26-2911"   # 可省略，有就變成連結
    url: "https://..."                    # 沒有 DOI 但有網址就用這個
```

新的寫最上面。

**想標註什麼，就用方括號寫在標題開頭：**

```yaml
    title: "[Invited] How do differences in interpreting seismic images…"
    title: "[Poster] Blind fault branching beneath Central Myanmar Basin"
    title: "[Keynote] …"
```

方括號裡的字會自動變成一個**框起來的小標籤**，內容隨妳寫，**不用先定義任何分類**。

摘要連結：有 DOI 就填 `doi:`；沒有的話，多數摘要在
[Google Scholar](https://scholar.google.com/citations?user=UTmGp2YAAAAJ&hl=zh-TW)
上找得到網址，填進 `url:` 即可。頁面上也放了一行指向妳的 Scholar。


---

## 5c. CV 的機構連結與圖示

`_data/cv.yml` 每一筆都可以加兩個選用欄位：

```yaml
  - when: "2024/4 – present"
    what: "Postdoctoral Fellow"
    where: "Institute of Earth Sciences, Academia Sinica, Taipei, Taiwan"
    link: "https://www.earth.sinica.edu.tw/en/"
    icon: "fas fa-building-columns"
```

### 連結會掛在「機構名稱」那一行

| 區塊 | 粗體大字（`what`） | 斜體小字（`where`） | 連結掛在 |
|---|---|---|---|
| **Education** | 校系名稱 | 研究領域 | **大字**（校系）|
| Employment / 其他 | 職稱 | 單位名稱 | **小字**（單位）|

因為 Education 的主角是學校、Employment 的主角是職稱 —— 這是模板自動判斷的，
妳只要照上表把內容填在對的欄位就好。

### 圖示

到 <https://fontawesome.com/search?o=r&m=free> 找，挑 **Free** 的，複製 class 名稱。常用：

| 圖示 | class |
|---|---|
| 研究機構 | `fas fa-building-columns` |
| 學校 | `fas fa-graduation-cap` |
| 業界 | `fas fa-helmet-safety` |
| 獎項 | `fas fa-award` |
| 合作 | `fas fa-users` |

### 想暫時隱藏某一行

在行首加 `#` 就好，例如 `#note: "..."`、`#link: "..."`。
注意 **`note` 一則一則獨立** —— 只註解 Employment 的不會影響 Education 的。
要一次列出還有哪些沒註解：

```bash
grep -n "^    note:" ~/Documents/GitHub/huwanlin/_data/cv.yml
```

---

## 6. 標籤的名稱與顏色

全部定義在 **`_data/topics.yml`**：

```yaml
geodynamics:
  label: "Geodynamics"
  color: "#c0392b"
```

- `geodynamics` 是**代號**，就是論文 front matter 裡 `topics: [...]` 要寫的字
- `label` 是讀者看到的字 —— **一律用英文**，標籤要保持一致
- `color` 是隨便一個 hex 色碼

> 標題和說明文字要中文、英文還是中英夾雜都可以，那是妳自己決定的；
> 只有**標籤（`label`）統一用英文**。

**新增一個標籤** → 在 `_data/topics.yml` 加三行，然後在論文的 `topics:` 用它。
**刪掉一個標籤** → 從 `_data/topics.yml` 移除該區塊（記得也把用到它的論文 `topics:` 拿掉）。
沒定義的代號不會壞掉，只會顯示成灰色的原始字。

改完 `_data/topics.yml` 記得**重開本機預覽**。

### 點標籤 = 篩選

論文頁上方有一排標籤，卡片上的標籤也可以點。點下去只會留下同一個領域的論文，再點一次（或點「All」）就還原。
右邊會顯示「3 of 8」，沒有論文的分區標題會自動隱藏。**網址不會變**，所以上一頁不受影響。

篩選列是自動產生的 —— 只列出**真的有論文在用**的標籤，`_data/topics.yml` 裡定義了但沒用到的不會出現。
程式在 `assets/js/pub-filter.js`，樣式在 `assets/css/custom.css` 的 `.topic-tag` / `.pub-filter`。

---

## 7. 加一個新分區

**（a）論文頁裡的新分區**（例如「Book chapters」）：

在 `_config.yml` 的 `publication_category` 加一塊 —— **順序就是頁面上的顯示順序**：

```yaml
publication_category:
  outreach:
    title: '科普寫作 · Public engagement writing'
    label: 'Outreach'
  bookchapters:                       # ← 新增
    title: 'Book chapters'
    label: 'Book chapter'
  manuscripts:
    title: 'Peer-reviewed journal articles'
    label: 'Journal paper'
```

然後在論文檔裡寫 `category: bookchapters`。

想給新分區一個顏色，在 `assets/css/custom.css` 加一行：

```css
.pub-tag--bookchapters { background: #16a085; }
```

**（b）某一頁裡面的新章節** —— Markdown 頁面（About / Research / Fieldwork / Resources）直接寫：

```markdown
新章節標題
======

內文……

小標題
------
```

`======` 是 h2（會有綠色底線），`------` 是 h3。

---

## 8. 加一個新頁面與選單按鈕

**兩步。**

**第 1 步 — 建頁面**：在 `_pages/` 新增 `others.md`：

```markdown
---
layout: single
title: "Others"
permalink: /others/
author_profile: true
---

內容寫這裡。
```

`permalink` 就是網址（`https://wanlin001.github.io/others/`）。

**第 2 步 — 加到選單**：編 `_data/navigation.yml`，順序就是選單順序：

```yaml
main:
  - title: "Research"
    url: /research/
  - title: "Publications"
    url: /publications/
  - title: "Others"          # ← 新增
    url: /others/
  - title: "CV"
    url: /cv/
```

從 `navigation.yml` 刪掉一項只會讓按鈕消失，**頁面本身還在**（網址還進得去）。

---

## 9. 下拉選單

**已經做好了**，直接在 `_data/navigation.yml` 用 `children:` 就會產生下拉選單：

```yaml
main:
  - title: "Research"
    url: /research/

  - title: "Others"          # 只是一個群組標籤，本身沒有頁面
    children:
      - title: "Fieldwork & travel"
        url: /fieldwork/
      - title: "Resources"
        url: /resources/
```

行為：

- **桌機** — 滑鼠移上去自動展開
- **手機／觸控** — 點一下展開，點外面或按 Esc 收起
- 群組本身也想是一個頁面的話，給它 `url:`（例如 `url: /others/`），它就變成可以點的連結，滑過去一樣會展開
- 目前在哪一頁，選單裡對應的那一項會變綠色
- 視窗變窄時整組會自動收進右上角的漢堡選單，並且變成縮排的清單

**想改回單層** —— 把 `children:` 那幾行拿掉、每項各自寫 `url:` 就好，例如：

```yaml
  - title: "Fieldwork"
    url: /fieldwork/
  - title: "Resources"
    url: /resources/
```

**相關檔案**（一般不用碰）：

| 檔案 | 作用 |
|---|---|
| `_includes/masthead.html` | 選單的 HTML，判斷有沒有 `children:` |
| `assets/css/custom.css` 最下面 | 下拉選單的樣式（寬度、陰影、位置） |
| `_includes/footer/custom.html` 最下面 | 觸控裝置的點擊展開 / 點外面收起 |

> 選單只支援**一層**下拉（`children` 裡面再放 `children` 不會生效）。學術網站幾乎不需要更多層。

### 順便把頁面網址也搬進子路徑（選用）

上面只是把選單分組，網址還是 `/fieldwork/`。如果想連網址也變成 `/others/fieldwork/`：

在 `_pages/fieldwork.md` 的 front matter 改：

```yaml
permalink: /others/fieldwork/
redirect_from:
  - /fieldwork/          # 舊網址自動轉址，別人存的連結才不會壞
```

然後把 `navigation.yml` 裡的 `url:` 一起改成 `/others/fieldwork/`。

---

## 10. Notes 與 Travel 的積木

### Notes（`/notes/`）

內容全在 **`_data/notes.yml`**，分成兩塊：

```yaml
categories:              # 分區，順序 = 頁面上的顯示順序
  hiking:
    title: "Hiking"

notes:                   # 每一則筆記
  - title: "Multi-day hiking gear checklist"
    url: "https://hackmd.io/@HuWanLin/H1qQUcWX1l"
    category: hiking     # 對應上面的代號
    source: "HackMD"
    date: "Feb 2024"
    excerpt: "One or two sentences."
```

- 只有 `title` 和 `url` 是必填，其他全部可以不寫
- **標題和說明中文英文都可以**，一則一則自己決定（標籤 `topics` 才是統一英文）
- **`categories:` 和 `notes:` 各自只能出現一次**（YAML 重複的 key 會蓋掉前面的）
- 加一則 = 在 `notes:` 底下多一組 `- title:`
- `category:` 沒填或填了不存在的代號 → 自動歸到最後的 Other 區
- 沒有筆記的分區標題會自動隱藏，所以分區可以先定義好放著

**標籤是選用的，而且是一則一則決定。** 哪天想幫某一則加，就在那一則底下加一行：

```yaml
    topics: [gear, checklist]
```

- 不寫 → 那則就沒有標籤
- 全部都不寫 → 頁面上方的篩選列**整條自動消失**（目前就是這樣）
- 只有幾則寫 → 只有那幾則顯示標籤，篩選列也只列出有被用到的

標籤的名稱和顏色跟論文共用 `_data/topics.yml`。已經定義好但目前沒用到的
（`gear` / `checklist` / `tools` / `safety`）留在那裡不會有任何影響，要用再用。

### Travel（`/travel/`）

一趟旅行的開頭用 `trip.html`，一行就有標題 + 時間地點 + 地圖：

```liquid
{% raw %}{% include trip.html title="Vajont Dam" when="May 2026"
                     place="Erto e Casso and Longarone, Italy"
                     lat="46.2672" lon="12.3293" span="0.055" %}{% endraw %}
```

底下就自由發揮，一般 Markdown 加上這幾個積木：

```liquid
{% raw %}照片：
{% include photos.html dir="/images/travel/vajont" files="1.jpg, 2.jpg"
                       captions="第一張, 第二張" %}

連結卡：
{% include link-card.html title="標題" url="https://..." source="Medium"
                          date="2026" excerpt="一句說明" %}{% endraw %}
```

`trip.html` 的地圖有兩種寫法，二選一：

| 寫法 | 用在 |
|---|---|
| `lat="46.2672" lon="12.3293"` | 單一地點，畫 OpenStreetMap。**不用 API key、不用設定分享**。再加 `span="0.055"` 調整看多大範圍 |
| `mid="182NqsK3rnf..."` | 自己做的 Google My Maps，網址裡 `mid=` 後面那串。地圖要設成公開分享 |
| 兩個都不寫 | 就沒有地圖 |

座標怎麼拿：Google Maps 上對著地點按右鍵，第一列就是。

`_pages/travel.md` 最上面的註解寫了完整用法，直接照抄。

> ⚠️ **在註解裡寫 Liquid 範例要包 `{% raw %}...{% endraw %}`** ——
> HTML 註解 `<!-- -->` 只是「不顯示」，Liquid 還是會執行裡面的 `{% include %}`。
> 另外**註解裡不要再出現 `<!--`**，會讓註解提前結束、文字漏到頁面上。

### 照片怎麼放

1. 檔案丟進 `images/travel/`，建議一趟旅行開一個資料夾（`images/travel/nepal/`）
2. 網頁上的路徑就是 `/images/travel/nepal/1.jpg`
3. `git add -A && git commit -m "add photos" && git push`

建議：JPEG、長邊 ≤1600 px、每張 ≤500 KB。批次縮圖（macOS 內建，不用裝東西）：

```bash
sips -Z 1600 ~/Documents/GitHub/huwanlin/images/travel/nepal/*.jpg
```

---

## 11. 照片牆

`about.md` 和 `fieldwork.md` 裡都有現成的照片牆 HTML，但目前**用 `<!-- -->` 註解起來**了。
把照片放進對應資料夾後，刪掉 `<!--` 和 `-->` 就會出現自動排版的網格：

```html
<div class="photo-grid">
  <figure><img src="/images/fieldwork/nepal-1.jpg" alt=""><figcaption>說明文字</figcaption></figure>
  <figure><img src="/images/fieldwork/nepal-2.jpg" alt=""><figcaption>說明文字</figcaption></figure>
</div>
```

要幾張就寫幾個 `<figure>`，會自動換行。

---

### 匯入照片的完整流程

```bash
# 1. 建資料夾（一趟旅行一個）
mkdir -p ~/Documents/GitHub/huwanlin/images/travel/新地方

# 2. 把照片複製進去（Finder 拖曳也可以）
cp ~/來源資料夾/*.jpg ~/Documents/GitHub/huwanlin/images/travel/新地方/

# 3. 縮圖 + 壓縮（macOS 內建，不用裝東西）
sips -Z 1600 -s format jpeg -s formatOptions 55 \
     ~/Documents/GitHub/huwanlin/images/travel/新地方/*.jpg

# 4. 檢查大小，每張最好在 500 KB 上下
ls -lh ~/Documents/GitHub/huwanlin/images/travel/新地方/
```

然後在頁面裡加一行 `{% raw %}{% include photos.html dir="/images/travel/新地方" files="a.jpg, b.jpg" %}{% endraw %}`，
最後 `git add -A && git commit -m "add photos" && git push`。

**只放一張照片時**版面會自動變寬（最高 560px），直式照片也會保持正確比例，不會被拉扁。

## 11b. 照片牆

一頁把所有照片攤開來看：<https://wanlin001.github.io/photos/>（選單 → Others → Photos）

### 加照片 = 把檔案丟進資料夾，沒了

```bash
sips -Z 1600 -s format jpeg -s formatOptions 55 ~/來源/*.jpg
cp ~/來源/*.jpg ~/Documents/GitHub/huwanlin/images/gallery/
```

`images/gallery/` 底下的圖片會**自動出現**在照片牆上，不用登記在任何檔案裡。
`images/travel/` 底下的照片也會一起出現，所以旅行頁放過的照片不用再複製一份。

支援 `.jpg` / `.jpeg` / `.png` / `.webp`，依檔名反序排列（新的在前，所以檔名用日期開頭最順）。

### 說明文字：日期是自動的

**預設的說明就是拍攝日期，從檔名讀出來的** —— 檔名開頭是 `YYYYMMDD` 就會自動變成
「8 Nov 2022」。手機拍的照片本來就叫 `20221108_144202.jpg`，所以什麼都不用做。

平常照片是乾乾淨淨的，**滑鼠指到才會從底部浮出日期**，不佔版面。手機沒有 hover，會直接顯示。

想幫某張再加一句話，寫在 `_data/gallery.yml`，會接在日期後面：

```yaml
captions:
  20260516_152714_monte-toc.jpg: "Monte Toc 的滑動面"
```

顯示成 `16 May 2026 · Monte Toc 的滑動面`。只寫**檔名**，不用寫資料夾，**完全是選用的**。

> 檔名開頭不是日期、又沒寫說明的照片，滑過去不會有任何文字。
> 所以**檔名保持 `YYYYMMDD_` 開頭最省事** —— 日期自動有了，排序也自動對（新的在前）。

### 版面

用 CSS Grid 排的 masonry：每張照片依自己的長寬比佔用高度，**不裁切、不留空隙**。
特別寬的照片（長寬比 > 2.2，例如全景）**會自動橫跨兩欄**。
視窗變窄會自動從三欄變兩欄、一欄。

### 點下去看大圖

點任何一張會開全螢幕檢視：

| 操作 | 效果 |
|---|---|
| 點照片 | 開啟大圖 |
| `←` `→` 或畫面兩側的箭頭 | 上一張／下一張 |
| `Esc` 或點背景 | 關閉 |

程式在 `assets/js/photo-wall.js`，版面在 `custom.css` 的 `.wall` 和 `.lightbox` 區塊。

---

## 11c. 圖片自動壓縮

**不用再手動跑 sips 了。** 只要 commit 的內容含有 `images/` 底下的圖片，
超過標準的會在 commit 當下自動壓縮，並重新加入這次提交。

```
$ git commit -m "add photos"
── 圖片自動壓縮 ───────────────────────────────
  壓縮 images/gallery/20260516_152714.jpg  5498KB 4000x3000  →  555KB 1600x1200
  共壓縮 1 個檔案。
───────────────────────────────────────────────
```

### ⚠️ 三件要記得的事

**1. 換電腦、或重新 clone 之後，要再跑一次這行**

```bash
cd ~/Documents/GitHub/huwanlin && git config core.hooksPath .githooks
```

git 不會把 `.git/hooks/` 存進版本控制，所以 hook 放在 `.githooks/`（這個有進 git），
再用上面這行把 git 指過去。**只有這行設定要重跑，hook 本身不用重裝。**
忘了跑的話不會報錯，只是壓縮不會發生 —— 原尺寸照片會直接被推上去。

想確認現在有沒有生效：

```bash
git config core.hooksPath        # 印出 .githooks 就是好的
```

**2. 臨時想跳過壓縮**

```bash
git commit --no-verify -m "訊息"
```

**3. HEIC 不會自動轉**

iPhone 預設拍 `.heic`，瀏覽器支援不完整。commit 時偵測到會出現提醒，但**不會自動處理** ——
因為轉檔會改副檔名，可能默默弄壞頁面裡既有的引用。手動轉：

```bash
sips -s format jpeg -s formatOptions 55 檔名.heic --out 檔名.jpg
```

轉完記得把原本的 `.heic` 刪掉。

### 標準

| 項目 | 上限 |
|---|---|
| 最長邊 | 1600 px |
| 檔案大小 | 600 KB |
| JPEG 品質 | 55 |

兩項都符合就完全不碰。**已經壓過的檔案再 commit 一百次也不會重壓** ——
壓縮是先在暫存檔試做、確認真的變小才採用，所以不會有「越壓越糊」的問題。

想改標準，編 `scripts/optimize_images.sh` 最上面那三行，或臨時覆寫：

```bash
MAX_EDGE=2000 MAX_KB=900 ./scripts/optimize_images.sh
```

### 手動整理整個資料夾

```bash
cd ~/Documents/GitHub/huwanlin && ./scripts/optimize_images.sh
```

不加參數就掃過 `images/` 底下所有圖片。已經達標的會列在「略過」，不會被動到。

### 相關檔案

| 檔案 | 作用 |
|---|---|
| `.githooks/pre-commit` | commit 時自動觸發 |
| `scripts/optimize_images.sh` | 實際做壓縮的程式，也可以單獨執行 |

---

## 12. Google My Maps

`_pages/fieldwork.md` 裡嵌的是 **embed** 網址（不是 edit 網址）：

```
https://www.google.com/maps/d/embed?mid=<你的 MID>&hl=en
```

MID 在 My Maps 的網址列裡（`...&mid=182NqsK3rnf...`）。

⚠️ **地圖必須設成公開分享**（My Maps → 分享 → 「知道連結的任何人都可以檢視」），否則網頁上會是一片空白。
換一張地圖只要換 `mid=` 後面那串。

---

### 只是想標一個地點？用 place-map

My Maps 適合「一整趟行程的許多點」。如果只是想在文章裡標**一個地方**，用這個比較快 ——
**不用 API key、不用設定分享，貼上經緯度就會出現**（背景圖是 OpenStreetMap）：

```liquid
{% raw %}{% include place-map.html lat="46.2672" lon="12.3293" %}
{% include place-map.html lat="46.2672" lon="12.3293" span="0.055" caption="Diga del Vajont" %}{% endraw %}
```

| 參數 | 說明 |
|---|---|
| `lat` / `lon` | 要標記的點 |
| `span` | 顯示範圍，單位是度。`0.01` ≈ 一個村莊，`0.05` ≈ 一條山谷，`0.2` ≈ 一個區域。預設 `0.05` |
| `height` | 高度佔寬度的百分比，預設 55 |
| `caption` | 底下那行說明，可省略 |

經緯度哪裡來：Google Maps 上對著地點按右鍵，第一列就是；或用
`https://nominatim.openstreetmap.org/search?q=地名&format=json`。

底下會自動附一個「在 OpenStreetMap 開啟」的連結。

## 13. 把外部文章放進網站

### 最簡單、也最推薦：手寫清單

編 **`_data/notes.yml`**，一則文章一個區塊。

> ⚠️ **`notes:` 整個檔案只能出現一次**，寫在最上面。要加第二則是在它底下多一組 `- title:`，
> **不是再寫一次 `notes:`** —— YAML 遇到重複的 key 會直接蓋掉前面的，寫兩次只會剩最後一則。

```yaml
notes:

  - title: "第一則"
    url: "https://..."
    source: "HackMD"

  - title: "第二則"          # ← 就是這樣往下加，不用再寫 notes:
    url: "https://..."
    source: "Medium"
```

完整欄位：

```yaml
notes:
  - title: "兩日以上登山裝備清單"
    url: "https://hackmd.io/@HuWanLin/H1qQUcWX1l"
    source: "HackMD"
    date: "26 Feb 2024"
    excerpt: "多日行程的打包清單，可以直接在頁面上打勾。"
    image:                      # 可省略
```

存檔就會在 Resources 頁的「Notes & writing」變成一張卡片。刪掉區塊就消失。
HackMD、Medium、Notion、Google Doc、任何有網址的東西都能放。**不會壞、不依賴外部服務、一則一分鐘。**

### 可以直接把 HackMD 嵌進頁面嗎？可以

HackMD 沒有擋 iframe（沒有 `X-Frame-Options`，CSP 裡也沒有 `frame-ancestors`），所以可以直接嵌：

```html
<div class="map-embed">
  <iframe src="https://hackmd.io/@HuWanLin/H1qQUcWX1l" loading="lazy"></iframe>
</div>
```

（`.map-embed` 就是 Fieldwork 地圖用的那個自適應外框，直接借用。）

好處是 HackMD 改了網站就跟著改；壞處是被外框框住、樣式跟網站不一致、Google 也搜不到內容。**建議只在少數幾篇真的想讓人直接讀的內容用**，其他用上面的卡片連結。

> ⚠️ Medium 不行 —— 它回 `X-Frame-Options: SAMEORIGIN`，嵌不進來。

### 想變成網站上真正的頁面？

HackMD 的公開筆記在網址後面加 `/download` 會回傳原始 Markdown：

```bash
curl -L "https://hackmd.io/@HuWanLin/H1qQUcWX1l/download" -o _pages/gear-list.md
```

下載後在檔案最上面補一段 front matter（`---` 包住 `title:` 和 `permalink:`），它就變成網站上的一頁，樣式一致、Google 也搜得到。缺點是 HackMD 之後改了不會自動同步，要重跑一次指令。需要自動化再說。

### Medium 自動抓（選用，預設關閉）

Medium 的 RSS **沒有 CORS 標頭**，網頁用 JavaScript 直接抓會被瀏覽器擋，所以只能在 build 的時候抓。
`_config.yml` 裡的 `external_feeds:` 拿掉註解、填帳號，然後跑：

```bash
python3 scripts/fetch_feeds.py
```

抓到的文章會寫進 `_data/posts.yml`，接在手寫清單後面一起顯示。沒設定的話完全不影響。
Substack、WordPress 也通用。

> 不建議把全文複製過來：SEO 會判定重複內容，而且以後改稿要改兩個地方。

---

## 14. 訪客統計

**目前是關閉的** —— `_config.yml` 的 `analytics:` 兩個代號都留空，網站不會載入任何追蹤程式。
填其中一個就會開始計算。

### 選項 A：GoatCounter（推薦）

免費、開源、**不用 cookie、不用同意橫幅**，後台只有妳自己看得到。

1. 到 <https://www.goatcounter.com/signup> 註冊，網址取一個名字，例如 `wanlin`
   → 妳的後台就是 `https://wanlin.goatcounter.com`
2. 註冊時**不要**勾「public」，後台就只有妳登入看得到
3. 在 `_config.yml` 填：

   ```yaml
   analytics:
     provider               : "custom"
     goatcounter_code       : wanlin
   ```

4. `git push`，等幾分鐘，之後開後台就看得到人流

### 選項 B：Cloudflare Web Analytics

一樣免費、無 cookie。到 Cloudflare 後台 → Web Analytics → Add a site，
輸入 `wanlin001.github.io`，把它給的 token 填進 `cloudflare_token:`。

### 選項 C：Google Analytics 4

功能最多，但**會用 cookie**，歐盟訪客理論上需要同意橫幅，對學術個人網站有點過頭。
真的要用的話佈景本身就支援：

```yaml
analytics:
  provider               : "google-analytics-4"
  google:
    tracking_id          : G-XXXXXXXXXX
```

### 兩件要知道的事

- **本機預覽永遠不會被計入** —— 追蹤程式只在 `JEKYLL_ENV=production` 時輸出，
  也就是只有 GitHub Pages 建出來的版本才有；`jekyll serve` 不會。
- 想關掉就把代號清空，或把 `provider` 改回 `false`。

---

## 15. 分支設定

狀況：這個 repo 同時有 `main` 和 `master` 兩個分支。所有工作都在 `main`，但 GitHub Pages 一開始是從 `master` 發布 —— 所以 push 到 `main` 網站不會變。
想把 `master` 改名成 `main` 時，GitHub 會說 **`main already existed`**（因為 `main` 已經存在了）。

**不要改名。正確做法是直接切換發布來源：**

1. `Settings → Pages → Build and deployment → Branch`，下拉選 **`main`**，`/ (root)`，按 **Save**
2. `Settings → General → Default branch`，把預設分支改成 **`main`**
3. 確認網站正常後（等幾分鐘再開 <https://wanlin001.github.io>），回到 repo 首頁的 **branches**，把 `master` 刪掉

之後就只有一個分支，不會再搞混。

> 如果因故一定要留 `master` 當發布分支，替代做法是每次把 main 推過去：
> `git push origin main:master`

---

## 16. 自訂網域

想從 `wanlinhu.com` 之類的網址連到這個網站時才需要做。**不做也完全沒關係**，`wanlin001.github.io` 本來就是正式網址。

### 前提：要先去買一個網域

GitHub 不賣網域。一年大約 US$10–15。常用註冊商：Cloudflare Registrar（成本價、最便宜）、Namecheap、Gandi、Porkbun。

### 步驟

**1. 決定用哪一種**

| 型式 | 例子 | DNS 設定 | 備註 |
|---|---|---|---|
| **子網域（推薦）** | `www.wanlinhu.com` | 一筆 CNAME | 最穩、GitHub 官方推薦 |
| 頂層網域（apex） | `wanlinhu.com` | 四筆 A + 四筆 AAAA | 要手動維護 IP |

**2. 在註冊商的 DNS 面板加記錄**

子網域（`www`）：

```
類型: CNAME    名稱: www    值: wanlin001.github.io
```

頂層網域（apex）—— 四筆 A 全部都要加：

```
類型: A    名稱: @    值: 185.199.108.153
類型: A    名稱: @    值: 185.199.109.153
類型: A    名稱: @    值: 185.199.110.153
類型: A    名稱: @    值: 185.199.111.153
```

要支援 IPv6 再加四筆 AAAA：`2606:50c0:8000::153`、`2606:50c0:8001::153`、`2606:50c0:8002::153`、`2606:50c0:8003::153`（名稱都是 `@`）。

> ⚠️ 用 Cloudflare 當 DNS 的話，記錄的橘色雲朵要先切成 **DNS only（灰色）**，否則 GitHub 發不出憑證。憑證好了之後才可以開回代理。

**3. 在 GitHub 設定**

`Settings → Pages → Custom domain`，填入網域（例如 `www.wanlinhu.com`），按 **Save**。
GitHub 會做 DNS 檢查，通過後才會生效（DNS 可能要 10 分鐘到幾小時才傳播完）。

**4. 把 GitHub 自動產生的 CNAME 檔拉回本機** ← 很容易忘

按下 Save 之後，GitHub 會自動在 `main` 分支根目錄 commit 一個叫 `CNAME` 的檔案（裡面就一行網域）。**一定要拉回來**，否則下次 push 會把它蓋掉、網域就失效：

```bash
git pull
```

**5. 改 `_config.yml`** ← 不改的話站內連結會全部指向舊網址

```yaml
url: "https://www.wanlinhu.com"
```

這個佈景的內部連結都是絕對路徑（用 `site.url` 組出來的），所以這步不能跳過。改完 commit + push。

**6. 開啟 HTTPS**

回 `Settings → Pages`，勾選 **Enforce HTTPS**。憑證簽發最久要等 24 小時，選項還沒出現就是還在跑，隔天再來。

### 驗證

```bash
dig www.wanlinhu.com +short     # 子網域：應該看到 wanlin001.github.io
dig wanlinhu.com +short         # apex：應該看到那四個 185.199.x.153
```

### 常見坑

- **push 之後網域失效** → `CNAME` 檔被蓋掉了。重新在 Settings 填一次，然後 `git pull`。
- **憑證一直發不出來** → Cloudflare 的橘色雲朵沒關掉，或 DNS 還沒傳播完。
- **網址對了但 CSS / 圖片壞掉** → `_config.yml` 的 `url:` 忘了改。
- **想改回去** → 把 Custom domain 清空、刪掉 repo 裡的 `CNAME` 檔、`_config.yml` 的 `url` 改回 `https://wanlin001.github.io`。

---

## 17. 已經做過的客製

- **刪掉頁尾**：`_layouts/default.html` 和 `_layouts/cv-layout.html` 移除了 `page__footer` 區塊，只留一行 `Last updated`。
  ⚠️ `{% include footer/custom.html %}` **不能刪** —— 裡面是 MathJax，刪了數學式會壞。
- **關掉 Share on 按鈕**：`_config.yml` 的 `defaults` 裡 `share: false`。
- **關掉 RSS**：`_config.yml` 的 `atom_feed.hide: true`。
- **刪掉 `_data/cv.json`**：模板附的範例資料會**蓋掉** `_data/cv.yml`，害 CV 整頁空白。別把它加回來。
- **下拉選單的 JS 一定要放外部檔** (`assets/js/nav-dropdown.js`)。
  `_layouts/compress.html` 會把 HTML 的換行全部拿掉，所以寫在 `<script>` 裡的 `//` 註解
  會把後面整段程式一起註解掉，造成語法錯誤、整支腳本失效。**內嵌 script 千萬不要用 `//` 註解**
  （要註解就用 `/* */`）。同理，`_includes/` 底下的 analytics / comments 範本也有這個問題，
  但那些預設關閉所以沒事 —— 哪天要開 Google Analytics 或留言功能，記得先檢查。
- **下拉選單的 `pointer-events` 修正**（`custom.css` 最下面）。佈景的
  `_sass/layout/_masthead.scss` 有一條 `.masthead__menu-item.selected a { pointer-events: none; }`，
  用意是「你已經在這一頁了，不能再點」。但它是**後代選擇器** —— 當妳人在下拉選單裡的某一頁
  （例如 /fieldwork/），被標成 `.selected` 的是父層的「Others」，於是這條規則會把
  **父層標籤和整個下拉選單裡的每一個連結全部變成不能點**。custom.css 最後那段就是把點擊權還回去，
  不要刪。
- **關掉進場動畫**（`custom.css` 最下面）。佈景原本會把 masthead → 選單 → 側欄 → 內容
  依序淡入（`intro` 動畫，延遲 0.15s 到 0.45s，定義在 `_sass/layout/` 各檔）。因為選單和側欄
  每一頁都一樣，每次換頁重新淡入就變成「閃動」，所以整組關掉了。
  同時把 `body` 的 `padding-top` 固定成 65px —— 佈景 CSS 原本預留 70px，JS 載入後量到實際是
  65px 再改寫，造成內容每次載入都往上跳 5px。
- **深色模式先套用**（`_includes/head/custom.html` 最上面那段內嵌 script）。原本主題是等
  `main.min.js` 載完才套，深色模式使用者會先看到一閃的白底。那段 script 必須留在 `<head>`、
  必須是同步的、而且**不能有 `//` 註解**。
- **深色模式只換底色，不換強調色**（`custom.css` 最上面）。原本深色模式會把綠色和橘色
  換成比較亮的版本，結果同一張卡片在手機（深色）和筆電（淺色）看起來顏色不一樣。
  現在強調色、標籤色在兩種模式下**完全相同**，只有背景和陰影會變。
  改配色時請一起維持這個原則。
- **移除的東西**：Talks、Teaching、Portfolio、Blog posts、talkmap、markdown_generator、範例文章與圖檔。要救回來的話：`git log` 找得到，或去原始模板 repo 抓。

---

## 18. 待辦清單

- [ ] `images/profile.png` 換成自己的照片（現在是預設灰人像）
- [ ] Google My Maps 設成公開分享
- [ ] CV PDF 放進 `files/`，在 `_data/cv.yml` 第一行填 `pdf: /files/檔名.pdf`
- [ ] Zenodo 連結：`_pages/resources.md` 裡的 placeholder，以及各論文的 `codeurl:`
- [ ] About（3 張）、Fieldwork 照片
- [ ] 兩篇中文科普的**中文姓名寫法** —— `_publications/2026-tec-newsletter.md` 和 `2024-geology-tichi-sumatra.md` 裡有 `# TODO` 標記
- [ ] `_config.yml` 裡的 Bluesky / LinkedIn 等社群欄位（不填就不顯示）

---

## 19. 出事了怎麼辦

```bash
# 看改了什麼
git diff

# 丟掉某個檔的所有未提交修改
git checkout -- _pages/about.md

# 丟掉全部未提交修改
git checkout -- .

# 救回被刪掉的檔案（先找 commit）
git log --oneline
git checkout <commit> -- 路徑/檔名
```

已經 push 上去的錯誤：`git revert <commit>` 然後 push。
本機 build 就報錯的話，錯誤訊息會直接印在 `jekyll serve` 的終端機上 —— 通常是 YAML 縮排或漏了引號。

---

