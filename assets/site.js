(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (!items.length || !window.HTMLDialogElement) return;
  var dlg = document.createElement('dialog');
  dlg.className = 'lb';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML = '<div class="lb-inner"><img alt=""><p></p></div>' +
    '<button class="lb-close" aria-label="Close">×</button>' +
    '<button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
    '<button class="lb-btn lb-next" aria-label="Next photo">›</button>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img'), cap = dlg.querySelector('p'), idx = 0;
  function show(i) {
    idx = (i + items.length) % items.length;
    var b = items[idx];
    img.src = b.getAttribute('data-lightbox');
    img.alt = b.getAttribute('data-alt') || '';
    cap.textContent = b.getAttribute('data-caption') || '';
    cap.style.display = cap.textContent ? '' : 'none';
  }
  items.forEach(function (b, i) {
    b.addEventListener('click', function () { show(i); dlg.showModal(); });
  });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
