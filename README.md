# wanlin001.github.io — 個人網站維護筆記

給自己看的操作手冊。基底是 [AcademicPages](https://github.com/academicpages/academicpages.github.io)（Jekyll，Minimal Mistakes 的 fork），已大幅精簡並客製。

---

## 網站架構 — 一張圖看懂

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

## 0. 最重要的兩件事

**（1）發布分支**

網站是從 GitHub 上的某一個分支自動 build 的。本機工作分支是 `main`。
到 `Settings → Pages → Build and deployment → Branch` 確認選的是 **`main`**。
（詳見下面第 8 節「分支問題」。）

**（2）改完要 push，網站才會變**

```bash
cd ~/Documents/GitHub/huwanlin
git add -A
git commit -m "說明改了什麼"
git push
```

push 後等 1–3 分鐘，GitHub 自動重新 build。進度看 repo 的 **Actions** 分頁。

---

## 1. 本機預覽（強烈建議每次改完先看）

```bash
cd ~/Documents/GitHub/huwanlin && bundle exec jekyll serve --port 4321
```

開 <http://localhost:4321/>。存檔會自動重新編譯，重整就看到。

> ⚠️ **改 `_config.yml` 或 `_data/*.yml` 要按 Ctrl+C 停掉、重跑指令**，否則不會生效。
> 其他檔案（`.md` / `.html` / `.css`）存檔即生效。

停止：在該終端機按 `Ctrl+C`。

---

## 2. 檔案在哪 — 速查表

| 我想改… | 改這個檔 |
|---|---|
| **配色、卡片樣式、標籤外觀** | **`assets/css/custom.css`** ← 所有客製 CSS 都在這 |
| 主色（綠色） | `assets/css/custom.css` 最上面的 `--wl-accent` |
| 首頁 About | `_pages/about.md` |
| Research | `_pages/research.md` |
| Fieldwork 野外地圖 | `_pages/fieldwork.md` |
| Resources | `_pages/resources.md` |
| CV **內容** | `_data/cv.yml` ← 純 YAML，不用碰 HTML |
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

## 3. 加一篇論文

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
有 `doi` 的話，Altmetric 甜甜圈和 Dimensions 引用圈也會自動出現（還沒有被引用/提及時會自己隱藏）。

---

## 4. 研究領域標籤（彩色小圓標）

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

## 5. 加一個新分區（section）

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

## 6. 加一個新頁面 + 選單按鈕

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

## 7. 下拉選單（submenu）

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

## 7b. Notes 頁與 Travel 頁的積木

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

這一頁是純 Markdown，但備好了三個「積木」，複製貼上就好：

```liquid
{% raw %}照片：
{% include photos.html dir="/images/travel/nepal" files="1.jpg, 2.jpg" %}
{% include photos.html dir="/images/travel/nepal" files="1.jpg, 2.jpg"
                       captions="第一張, 第二張" caption="整組的說明" %}

地圖：
{% include map.html mid="182NqsK3rnf..." caption="說明" %}

連結卡（Medium / HackMD / 任何網址）：
{% include link-card.html title="標題" url="https://..." source="Medium"
                          date="2026" excerpt="一句說明" %}{% endraw %}
```

其他就是一般 Markdown：`======` 是大標題（一趟旅行）、`------` 是小標題、
`**粗體**`、`[連結](網址)`。

`_pages/travel.md` 最上面有一段註解寫著全部用法，直接照抄。

> ⚠️ **在註解裡寫 Liquid 範例要包 `{% raw %}...{% endraw %}`** ——
> HTML 註解 `<!-- -->` 只是「不顯示」，Liquid 還是會執行裡面的 `{% include %}`，
> 結果就是頁面上冒出一張空的地圖或卡片。

### 照片怎麼放

1. 檔案丟進 `images/travel/`，建議一趟旅行開一個資料夾（`images/travel/nepal/`）
2. 網頁上的路徑就是 `/images/travel/nepal/1.jpg`
3. `git add -A && git commit -m "add photos" && git push`

建議：JPEG、長邊 ≤1600 px、每張 ≤500 KB。批次縮圖（macOS 內建，不用裝東西）：

```bash
sips -Z 1600 ~/Documents/GitHub/huwanlin/images/travel/nepal/*.jpg
```

---

## 8. 分支問題（`main already existed`）

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

## 8b. 自訂網域（Custom domain）

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

## 9. Google My Maps

`_pages/fieldwork.md` 裡嵌的是 **embed** 網址（不是 edit 網址）：

```
https://www.google.com/maps/d/embed?mid=<你的 MID>&hl=en
```

MID 在 My Maps 的網址列裡（`...&mid=182NqsK3rnf...`）。

⚠️ **地圖必須設成公開分享**（My Maps → 分享 → 「知道連結的任何人都可以檢視」），否則網頁上會是一片空白。
換一張地圖只要換 `mid=` 後面那串。

---

## 10. 照片牆

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

## 11. 已經做過的客製（別不小心改回去）

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
- **移除的東西**：Talks、Teaching、Portfolio、Blog posts、talkmap、markdown_generator、範例文章與圖檔。要救回來的話：`git log` 找得到，或去原始模板 repo 抓。

---

## 12. 還沒補的東西

- [ ] `images/profile.png` 換成自己的照片（現在是預設灰人像）
- [ ] Google My Maps 設成公開分享
- [ ] CV PDF 放進 `files/`，在 `_data/cv.yml` 第一行填 `pdf: /files/檔名.pdf`
- [ ] Zenodo 連結：`_pages/resources.md` 裡的 placeholder，以及各論文的 `codeurl:`
- [ ] About（3 張）、Fieldwork 照片
- [ ] 兩篇中文科普的**中文姓名寫法** —— `_publications/2026-tec-newsletter.md` 和 `2024-geology-tichi-sumatra.md` 裡有 `# TODO` 標記
- [ ] `_config.yml` 裡的 Bluesky / LinkedIn 等社群欄位（不填就不顯示）

---

## 14. 把外部文章（HackMD / Medium / Notion）放進網站

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

## 15. 出事了怎麼辦

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
