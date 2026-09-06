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
