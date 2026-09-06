/* Dropdown navigation for the masthead.
   Kept in its own file on purpose: the `compress` layout strips newlines from
   inline <script> blocks, which turns any // comment into a comment that eats
   the rest of the script. */

(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function () {
    var nav = document.getElementById('site-nav');
    if (!nav) { return; }

    function setOpen(li, open) {
      li.classList.toggle('is-open', open);
      var a = li.querySelector('.nav-parent');
      if (a) { a.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    }

    function closeAll(except) {
      var open = nav.querySelectorAll('.masthead__menu-item--has-children.is-open');
      for (var i = 0; i < open.length; i++) {
        if (open[i] !== except) { setOpen(open[i], false); }
      }
    }

    function toggle(parent, e) {
      var li = parent.parentNode;
      var isOpen = li.classList.contains('is-open');
      /* A group label with no page of its own only ever toggles.
         A group that does have a page follows its link on desktop, and
         opens on the first tap on a touch device. */
      var hasOwnPage = !parent.classList.contains('nav-parent--nolink');
      var isTouch = window.matchMedia('(hover: none)').matches;

      if (hasOwnPage && !isTouch) { return; }        /* let the link through */
      if (hasOwnPage && isTouch && isOpen) { return; } /* second tap navigates */

      e.preventDefault();
      closeAll(li);
      setOpen(li, !isOpen);
    }

    nav.addEventListener('click', function (e) {
      if (!e.target.closest) { return; }
      /* Clicks land on the <li> as often as on the <a>, because the theme
         gives the link a margin. Accept anywhere on the group item. */
      var li = e.target.closest('.masthead__menu-item--has-children');
      if (!li || !nav.contains(li)) { return; }
      if (e.target.closest('.nav-submenu')) { return; }  /* let sub-links work */
      var parent = li.querySelector('.nav-parent');
      if (parent) { toggle(parent, e); }
    });

    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') { return; }
      var parent = e.target.closest && e.target.closest('.nav-parent');
      if (parent && nav.contains(parent) && !parent.getAttribute('href')) {
        toggle(parent, e);
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) { closeAll(null); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(null); }
    });
  });
})();
