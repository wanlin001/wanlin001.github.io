/* Copy the email address to the clipboard instead of opening a mail app.
   The link carries the address in data-email, and the address shown on hover
   in data-hover, written as name[at]domain — which also keeps it away from the
   simplest address-harvesting robots. The hover bubble itself is CSS, so it
   appears the moment the pointer arrives. */
(function () {
  'use strict';

  /* show "copied" next to the label for a moment; nothing else changes */
  function flash(el) {
    if (el.dataset.busy === '1') { return; }
    el.dataset.busy = '1';
    el.classList.add('is-copied');
    window.setTimeout(function () {
      el.classList.remove('is-copied');
      el.dataset.busy = '0';
    }, 2000);
  }

  /* older browsers, and anywhere the Clipboard API refuses */
  function legacyCopy(text) {
    var box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('readonly', '');
    box.style.position = 'fixed';
    box.style.opacity = '0';
    document.body.appendChild(box);
    box.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(box);
    return ok;
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text) ? Promise.resolve() : Promise.reject();
      });
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject();
  }

  function handle(e, el) {
    e.preventDefault();
    var address = el.getAttribute('data-email');
    if (!address) { return; }
    copy(address).then(
      function () { flash(el); },
      /* if the browser refuses to copy, at least put the address on screen */
      function () {
        var span = el.querySelector('.author__email-flash');
        if (span) { span.textContent = ' ' + address; }
        flash(el);
      }
    );
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.author__email');
    if (el) { handle(e, el); }
  });

  /* it is an <a role="button">, so it also has to answer to the keyboard */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') { return; }
    var el = e.target.closest && e.target.closest('.author__email');
    if (el) { handle(e, el); }
  });
})();
