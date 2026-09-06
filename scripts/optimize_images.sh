#!/bin/bash
# Shrink oversized images in place, using sips (built into macOS).
#
#   scripts/optimize_images.sh                 # every image under images/
#   scripts/optimize_images.sh a.jpg b.png     # just these
#
# A file is left alone if it is already within both limits, so running it
# twice costs nothing and never degrades a photo that is already fine.

set -u

MAX_EDGE=${MAX_EDGE:-1600}      # longest side, pixels
MAX_KB=${MAX_KB:-600}           # file size, kilobytes
QUALITY=${QUALITY:-55}          # JPEG quality when re-encoding

if ! command -v sips >/dev/null 2>&1; then
  echo "optimize_images: sips not found (macOS only) — skipping." >&2
  exit 0
fi

root=$(cd "$(dirname "$0")/.." && pwd)

if [ "$#" -gt 0 ]; then
  files=("$@")
else
  IFS=$'\n' read -r -d '' -a files < <(
    find "$root/images" -type f \
      \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) && printf '\0'
  )
fi

changed=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  case "$f" in
    *.jpg|*.JPG|*.jpeg|*.JPEG|*.png|*.PNG) ;;
    *) continue ;;
  esac

  w=$(sips -g pixelWidth  "$f" 2>/dev/null | awk '/pixelWidth/  {print $2}')
  h=$(sips -g pixelHeight "$f" 2>/dev/null | awk '/pixelHeight/ {print $2}')
  [ -n "${w:-}" ] && [ -n "${h:-}" ] || continue
  kb=$(( $(stat -f%z "$f") / 1024 ))
  edge=$(( w > h ? w : h ))

  if [ "$edge" -le "$MAX_EDGE" ] && [ "$kb" -le "$MAX_KB" ]; then
    continue
  fi

  before="${kb}KB ${w}x${h}"

  # work on a copy, so a file that would not actually get smaller is left
  # untouched instead of being re-encoded (and degraded) on every run
  tmp=$(mktemp -t optimg).${f##*.}
  cp "$f" "$tmp"
  case "$f" in
    *.png|*.PNG) sips -Z "$MAX_EDGE" "$tmp" --out "$tmp" >/dev/null 2>&1 ;;
    *)           sips -Z "$MAX_EDGE" -s format jpeg -s formatOptions "$QUALITY" "$tmp" --out "$tmp" >/dev/null 2>&1 ;;
  esac

  nkb=$(( $(stat -f%z "$tmp") / 1024 ))

  # keep the result only if the picture had to shrink, or the file really did
  if [ "$edge" -gt "$MAX_EDGE" ] || [ "$nkb" -lt $(( kb * 95 / 100 )) ]; then
    mv "$tmp" "$f"
    nw=$(sips -g pixelWidth  "$f" 2>/dev/null | awk '/pixelWidth/  {print $2}')
    nh=$(sips -g pixelHeight "$f" 2>/dev/null | awk '/pixelHeight/ {print $2}')
    echo "  壓縮 ${f#$root/}  ${before}  →  ${nkb}KB ${nw}x${nh}"
    changed=$((changed + 1))
  else
    rm -f "$tmp"
    # to stderr, so the pre-commit hook stays quiet about files it left alone
    echo "  略過 ${f#$root/}  ${before}  已經壓到極限，再壓只會變糊" >&2
  fi
done

[ "$changed" -gt 0 ] && echo "  共壓縮 $changed 個檔案。"
exit 0
