/* Click a photo on /photos/ to open it full size.
   Arrow keys and the on-screen arrows move between photos; Esc or a click on
   the backdrop closes. Kept in its own file: the compress layout strips
   newlines, which would break // comments inside an inline script. */

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    var wall = document.getElementById('wall');
    var box  = document.getElementById('lightbox');
    if (!wall || !box) { return; }

    var items = [].slice.call(wall.querySelectorAll('.wall__item'));
    var img   = box.querySelector('.lightbox__img');
    var cap   = box.querySelector('.lightbox__caption');
    var at    = 0;

    function show(i) {
      at = (i + items.length) % items.length;
      var fig = items[at];
      var src = fig.querySelector('img').getAttribute('src');
      img.setAttribute('src', src);
      var text = fig.getAttribute('data-caption') || '';
      cap.textContent = text;
      img.setAttribute('alt', text);
      box.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function close() {
      box.hidden = true;
      img.setAttribute('src', '');
      document.body.style.overflow = '';
    }


    /* ---- masonry ------------------------------------------------------
       Lay the wall out as a grid and give each tile a row span matching its
       aspect ratio, so nothing is cropped and there are no ragged gaps.
       Panoramas take two columns. Uses the browser's own view of the image,
       so photos carrying an EXIF rotation are measured correctly.
       Falls back to the plain CSS column layout if this never runs.        */

    var ROW = 8, GAP = 10;

    function layout(fig) {
      var im = fig.querySelector('img');
      if (!im.naturalWidth) { return; }
      var ratio = im.naturalWidth / im.naturalHeight;
      fig.classList.toggle('wall__item--wide', ratio > 2.2);
      var w = fig.getBoundingClientRect().width;
      if (!w) { return; }
      var h = w / ratio;
      fig.style.gridRowEnd = 'span ' + Math.ceil((h + GAP) / ROW);
    }

    function layoutAll() { items.forEach(layout); }

    wall.classList.add('wall--js');
    items.forEach(function (fig) {
      var im = fig.querySelector('img');
      if (im.complete) { layout(fig); }
      else { im.addEventListener('load', function () { layout(fig); }); }
    });

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(layoutAll, 120);
    });
    window.addEventListener('load', layoutAll);

    items.forEach(function (fig, i) {
      fig.setAttribute('tabindex', '0');
      fig.addEventListener('click', function () { show(i); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
      });
    });

    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('lightbox__nav--prev')) { show(at - 1); return; }
      if (e.target.classList.contains('lightbox__nav--next')) { show(at + 1); return; }
      if (e.target === img) { return; }
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (box.hidden) { return; }
      if (e.key === 'Escape')     { close(); }
      if (e.key === 'ArrowLeft')  { show(at - 1); }
      if (e.key === 'ArrowRight') { show(at + 1); }
    });
  });
})();
