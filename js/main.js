/* ============================================================
   LED'ZART PRODUCTION – main.js
   ============================================================ */

/* ---------- DROPDOWN DESKTOP ---------- */
function initDropdowns() {
  const items = document.querySelectorAll('.nav-item.has-dropdown');
  if (!items.length) return;

  let closeTimer;

  items.forEach(item => {
    const link = item.querySelector('.nav-link');

    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      openDropdown(item, link);
    });
    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => closeDropdown(item, link), 120);
    });

    link.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      items.forEach(i => closeDropdown(i, i.querySelector('.nav-link')));
      if (!isOpen) openDropdown(item, link);
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      items.forEach(i => closeDropdown(i, i.querySelector('.nav-link')));
    }
  });
}

function openDropdown(item, link) {
  item.classList.add('open');
  if (link) link.setAttribute('aria-expanded', 'true');
}
function closeDropdown(item, link) {
  item.classList.remove('open');
  if (link) link.setAttribute('aria-expanded', 'false');
}

/* ---------- BURGER + DRAWER MOBILE ---------- */
function initDrawer() {
  const burger      = document.getElementById('burgerBtn');
  const drawer      = document.getElementById('navDrawer');
  const overlay     = document.getElementById('drawerOverlay');
  const drawerAssoc = document.getElementById('drawerAssoc');

  if (!burger || !drawer) return;

  function openDrawer() {
    burger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // empêche le scroll derrière
  }

  function closeDrawer() {
    burger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  // Fermer en cliquant sur l'overlay
  overlay.addEventListener('click', closeDrawer);

  // Fermer avec Echap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  // Sous-menu "L'association" dans le drawer
  if (drawerAssoc) {
    drawerAssoc.addEventListener('click', e => {
      e.preventDefault();
      const item = drawerAssoc.closest('.drawer-item');
      item.classList.toggle('open');
    });
  }
}

/* ---------- TRANSITION PAGE (glissement depuis le bas) ---------- */
function initPageTransition() {
  const btn = document.getElementById('btnDecouvrir');
  if (!btn) return;

  const curtain = document.createElement('div');
  curtain.className = 'transition-curtain';
  document.body.appendChild(curtain);

  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = btn.getAttribute('href');
    curtain.classList.add('slide-up');
    setTimeout(() => { window.location.href = target; }, 560);
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initDrawer();
  initPageTransition();
  initContactMessage();
});


function initContactMessage() {
  const msg = document.getElementById('formMessage');
  if (!msg) return;

  const params = new URLSearchParams(window.location.search);

  if (params.get('success')) {
    msg.textContent = "Message envoyé avec succès !";
    msg.style.color = "#38d1ff";
  }

  if (params.get('error')) {
    msg.textContent = "Erreur lors de l'envoi. Réessaie.";
    msg.style.color = "red";
  }
}