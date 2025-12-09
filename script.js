// -------------------------
// Simple site script
// - smooth nav scrolling
// - reveal-on-scroll
// - copy email helper (optional)
// - year update in footer
// -------------------------

// Smooth scroll for navbar links (works with anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // only handle same-page anchors
    const href = this.getAttribute('href');
    if (!href || href.length === 0 || href === '#') return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal-on-scroll simple helper
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const height = window.innerHeight;
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < height - 80) {
      el.classList.add('visible');
    }
  });
}

// Copy email helper (used by some buttons or future additions)
function copyEmailToClipboard(email) {
  if (!navigator.clipboard) {
    // fallback
    const tmp = document.createElement('textarea');
    tmp.value = email;
    document.body.appendChild(tmp);
    tmp.select();
    try { document.execCommand('copy'); } catch (e) {}
    tmp.remove();
    return;
  }
  navigator.clipboard.writeText(email).catch(() => {});
}

// Contact form stub (replace with real backend)
function handleContactForm(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  if (status) status.textContent = 'Message captured locally — configure backend to send.';
  e.target.reset();
  setTimeout(() => { if (status) status.textContent = ''; }, 3000);
  return false;
}

// Attach listeners and initialize
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  // attach scroll listener
  window.addEventListener('scroll', revealOnScroll);

  // update year placeholders if present
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2').forEach(el => { el.textContent = y; });

  // expose helpers globally if needed
  window.copyEmailToClipboard = copyEmailToClipboard;
  window.handleContactForm = handleContactForm;
});
