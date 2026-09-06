/* Click a research-field tag to show only the publications that carry it.
   Tags appear both in the filter bar at the top and on each card; clicking
   either does the same thing. Clicking the active tag again (or "All")
   clears the filter. The URL is never touched, so Back still works. */

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    var cards = [].slice.call(document.querySelectorAll('.pub-card[data-topics]'));
    if (!cards.length) { return; }

    var bar      = document.getElementById('pub-filter');
    var countEl  = document.getElementById('pub-filter-count');
    var emptyEl  = document.getElementById('pub-empty');
    var sections = [].slice.call(document.querySelectorAll('.pub-section'));
    var active   = '';

    function apply(topic) {
      active = topic;
      var shown = 0;

      cards.forEach(function (card) {
        var list = (card.getAttribute('data-topics') || '').split(/\s+/);
        var match = !topic || list.indexOf(topic) !== -1;
        card.hidden = !match;
        if (match) { shown++; }
      });

      /* hide a section heading when nothing under it survives the filter */
      sections.forEach(function (sec) {
        var visible = sec.querySelector('.pub-card:not([hidden])');
        sec.hidden = !visible;
      });

      /* reflect the state on every copy of every tag */
      [].forEach.call(document.querySelectorAll('.topic-tag'), function (el) {
        var isActive = topic
          ? el.getAttribute('data-topic') === topic
          : el.classList.contains('topic-tag--all');
        el.classList.toggle('is-active', isActive);
      });

      if (countEl) {
        countEl.textContent = topic ? shown + ' of ' + cards.length : '';
      }
      if (emptyEl) { emptyEl.hidden = shown !== 0; }
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.topic-tag');
      if (!btn) { return; }
      e.preventDefault();
      var topic = btn.getAttribute('data-topic') || '';
      apply(topic === active ? '' : topic);
      if (bar && topic) { bar.scrollIntoView({block: 'nearest'}); }
    });
  });
})();
