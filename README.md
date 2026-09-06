# wanlin001.github.io — 個人網站維護筆記

給自己看的操作手冊。基底是 [AcademicPages](https://github.com/academicpages/academicpages.github.io)（Jekyll，Minimal Mistakes 的 fork），已大幅精簡並客製。

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
- `label` 是讀者看到的字（可以是中文）
- `color` 是隨便一個 hex 色碼

**新增一個標籤** → 在 `_data/topics.yml` 加三行，然後在論文的 `topics:` 用它。
**刪掉一個標籤** → 從 `_data/topics.yml` 移除該區塊（記得也把用到它的論文 `topics:` 拿掉）。
沒定義的代號不會壞掉，只會顯示成灰色的原始字。

改完 `_data/topics.yml` 記得**重開本機預覽**。

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

## 7. 改結構：把 Fieldwork 收到 Others 底下

上方選單**只支援單層，沒有下拉選單**（這是 Minimal Mistakes masthead 的限制）。所以做法是「Others 當入口頁」：

1. 建 `_pages/others.md`（照上面第 6 節），內容放通往子頁的連結：

   ```markdown
   ---
   layout: single
   title: "Others"
   permalink: /others/
   author_profile: true
   ---

   - [Fieldwork & travel](/others/fieldwork/) — 野外與旅行地圖
   - [Photography](/others/photos/)
   ```

2. 把 `_pages/fieldwork.md` 的 `permalink` 改成子路徑，並加上舊網址轉址：

   ```yaml
   permalink: /others/fieldwork/
   redirect_from:
     - /fieldwork/
   ```

   （`redirect_from` 很重要 —— 別人存的舊連結才不會壞。）

3. 在 `_data/navigation.yml` 把 `Fieldwork` 那項換成 `Others`。

如果**真的**想要下拉選單，得改 `_includes/masthead.html` 並寫 CSS，工程比較大，不建議。

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

## 13. 出事了怎麼辦

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
