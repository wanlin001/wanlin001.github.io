/* Copy the email address to the clipboard instead of opening a mail app.
   The button carries the address in data-email; hovering shows it written as
   name[at]domain (the title attribute), which also keeps it away from the
   simplest address-harvesting robots. */
(function () {
  'use strict';

  function flash(btn, message) {
    var label = btn.querySelector('.author__email-label');
    if (!label) { return; }
    if (btn.dataset.busy === '1') { return; }
    var original = label.textContent;
    btn.dataset.busy = '1';
    label.textContent = message;
    btn.classList.add('is-copied');
    window.setTimeout(function () {
      label.textContent = original;
      btn.classList.remove('is-copied');
      btn.dataset.busy = '0';
    }, 2000);
  }

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    /* older browsers, and any page not served over https */
    return new Promise(function (resolve, reject) {
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
      ok ? resolve() : reject();
    });
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.author__email');
    if (!btn) { return; }
    e.preventDefault();
    var address = btn.getAttribute('data-email');
    if (!address) { return; }
    copy(address).then(
      function () { flash(btn, 'Email address copied'); },
      function () { flash(btn, address); }
    );
  });
})();
