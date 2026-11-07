(function () {
  'use strict';

  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem('bari-lang') || DEFAULT_LANG;
  let deferredPrompt = null;

  // ========== i18n ==========
  function setLanguage(lang) {
    if (!window.translations[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    localStorage.setItem('bari-lang', lang);

    const t = window.translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.body.classList.toggle('rtl', t.dir === 'rtl');

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update select
    const select = document.getElementById('lang-select');
    if (select) select.value = lang;

    // Update title
    document.title = t.hero_title + ' | Bari Charity';
  }

  // ========== Navigation ==========
  function initNav() {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('open');
      });
      links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => links.classList.remove('open'));
      });
    }

    // Smooth scroll + active
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Header scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ========== PWA Install ==========
  function initPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('SW registered', reg.scope))
        .catch((err) => console.warn('SW registration failed', err));
    }

    // Capture install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showInstallBanner();
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      hideInstallBanner();
    });

    // Manual install button if already captured
    const installBtn = document.getElementById('install-yes');
    const laterBtn = document.getElementById('install-no');
    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          hideInstallBanner();
        }
        deferredPrompt = null;
      });
    }
    if (laterBtn) {
      laterBtn.addEventListener('click', () => {
        hideInstallBanner();
        localStorage.setItem('bari-install-dismissed', Date.now());
      });
    }
  }

  function showInstallBanner() {
    const dismissed = localStorage.getItem('bari-install-dismissed');
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;
    const banner = document.getElementById('install-banner');
    if (banner) {
      setTimeout(() => banner.classList.add('show'), 2500);
    }
  }

  function hideInstallBanner() {
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('show');
  }

  // ========== Contact form (demo) ==========
  function initForm() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = '✓';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
          alert(currentLang === 'ar' ? 'تم إرسال رسالتك. شكراً لك!' :
                currentLang === 'am' ? 'መልእክትዎ ተልኳል። እናመሰግናለን!' :
                currentLang === 'om' ? 'Ergaan keessan ergameera. Galatoomaa!' :
                'Your message has been sent. Thank you!');
        }, 1000);
      });
    }
  }

  // ========== Init ==========
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    initNav();
    initPWA();
    initForm();

    const select = document.getElementById('lang-select');
    if (select) {
      select.addEventListener('change', (e) => setLanguage(e.target.value));
    }
  });
})();
