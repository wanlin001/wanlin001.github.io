#!/usr/bin/env python3
"""
Pull blog posts from an RSS/Atom feed (Medium, Substack, WordPress, ...) and
write them to _data/posts.yml so Jekyll can render them at build time.

Why not fetch in the browser? Medium's RSS sends no Access-Control-Allow-Origin
header, so a client-side fetch() is blocked by CORS, and medium.com sets
X-Frame-Options: SAMEORIGIN so the pages cannot be embedded in an iframe either.
Fetching at build time sidesteps both.

Config lives in _config.yml:

    external_feeds:
      - name: Medium
        url: https://medium.com/feed/@your-handle
        limit: 6

Run:  python3 scripts/fetch_feeds.py
"""

import html
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_data" / "posts.yml"
NS = {
    "content": "http://purl.org/rss/1.0/modules/content/",
    "atom": "http://www.w3.org/2005/Atom",
}
UA = "Mozilla/5.0 (compatible; academic-site-feed-fetcher/1.0)"


def read_feed_config():
    """Minimal parse of the `external_feeds:` block in _config.yml."""
    cfg = (ROOT / "_config.yml").read_text(encoding="utf-8")
    m = re.search(r"^external_feeds:\s*$(.*?)(?=^\S|\Z)", cfg, re.M | re.S)
    if not m:
        return []
    feeds, cur = [], None
    for line in m.group(1).splitlines():
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        if s.startswith("- "):
            if cur:
                feeds.append(cur)
            cur, s = {}, s[2:].strip()
        if cur is None or ":" not in s:
            continue
        k, v = s.split(":", 1)
        cur[k.strip()] = v.strip().strip('"').strip("'")
    if cur:
        feeds.append(cur)
    return [f for f in feeds if f.get("url")]


def strip_html(raw, limit=260):
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", raw or "", flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > limit:
        text = text[:limit].rsplit(" ", 1)[0] + "…"
    return text


def first_image(raw):
    for m in re.finditer(r'<img[^>]+src="([^"]+)"', raw or ""):
        src = m.group(1)
        if "/_/stat" in src or "pixel" in src:   # Medium's tracking pixel
            continue
        return src
    return ""


def parse_date(item):
    for tag in ("pubDate", "published", "updated"):
        node = item.find(tag)
        if node is None:
            node = item.find(f"atom:{tag}", NS)
        if node is not None and node.text:
            raw = node.text.strip()
            try:
                return parsedate_to_datetime(raw).astimezone(timezone.utc)
            except (TypeError, ValueError):
                pass
            try:
                return datetime.fromisoformat(raw.replace("Z", "+00:00"))
            except ValueError:
                pass
    return None


def parse_feed(name, url, limit):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        root = ET.fromstring(resp.read())

    items = root.findall(".//item") or root.findall(".//atom:entry", NS)
    posts = []
    for item in items[: int(limit)]:
        title_node = item.find("title")
        if title_node is None:
            title_node = item.find("atom:title", NS)
        title = (title_node.text or "").strip() if title_node is not None else ""

        link_node = item.find("link")
        link = ""
        if link_node is not None:
            link = (link_node.text or link_node.get("href") or "").strip()
        if not link:
            alt = item.find("atom:link", NS)
            if alt is not None:
                link = alt.get("href", "")
        link = link.split("?source=")[0]

        body = ""
        for tag in ("description", "content:encoded", "atom:summary", "atom:content"):
            node = item.find(tag, NS) if ":" in tag else item.find(tag)
            if node is not None and node.text and node.text.strip():
                body = node.text
                break

        dt = parse_date(item)
        posts.append(
            {
                "title": title,
                "url": link,
                "source": name,
                "date": dt.strftime("%Y-%m-%d") if dt else "",
                "date_display": dt.strftime("%d %b %Y") if dt else "",
                "excerpt": strip_html(body),
                "image": first_image(body),
            }
        )
    return posts


def yaml_quote(value):
    return '"' + str(value).replace("\\", "\\\\").replace('"', '\\"') + '"'


def main():
    feeds = read_feed_config()
    if not feeds:
        print("No `external_feeds:` configured in _config.yml — nothing to do.")
        return 0

    posts = []
    for feed in feeds:
        name, url = feed.get("name", "Blog"), feed["url"]
        try:
            got = parse_feed(name, url, feed.get("limit", 6))
            print(f"{name}: {len(got)} post(s) from {url}")
            posts.extend(got)
        except Exception as exc:                      # noqa: BLE001
            print(f"WARNING: {name} ({url}) failed: {exc}", file=sys.stderr)

    posts.sort(key=lambda p: p["date"], reverse=True)

    lines = [
        "# AUTO-GENERATED by scripts/fetch_feeds.py — do not edit by hand.",
        "# Edit the `external_feeds:` block in _config.yml instead.",
        f"# Last fetched: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "posts:",
    ]
    for p in posts:
        lines.append(f"  - title: {yaml_quote(p['title'])}")
        for key in ("url", "source", "date", "date_display", "excerpt", "image"):
            if p[key]:
                lines.append(f"    {key}: {yaml_quote(p[key])}")
    if not posts:
        lines[-1] = "posts: []"

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {len(posts)} post(s) to {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
