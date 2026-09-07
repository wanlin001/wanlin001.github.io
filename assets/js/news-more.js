/* "See more" on the home page news list — expands in place, no new page.
   Kept in its own file: the compress layout strips newlines, which would
   break // comments inside an inline script. */

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    var btn = document.getElementById('news-more');
    var list = document.getElementById('news-list');
    if (!btn || !list) { return; }

    var extra = [].slice.call(list.querySelectorAll('.news__item--extra'));
    if (!extra.length) { btn.hidden = true; return; }

    btn.addEventListener('click', function () {
      var opening = extra[0].hidden;
      extra.forEach(function (li) { li.hidden = !opening; });
      btn.textContent = opening ? btn.dataset.less : btn.dataset.more;
      btn.classList.toggle('is-open', opening);
      if (!opening) { list.scrollIntoView({block: 'nearest'}); }
    });
  });
})();
