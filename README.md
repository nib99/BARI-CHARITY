# Bari Charity Organisation — Progressive Web App

**Dhaabbata Tola Ooltummaa Barii / المؤسسة الخيرية بري**

> Legacy Together, For Future Generations — Faith

A production-ready, multilingual Progressive Web App for Bari Charity Organisation.

## Features

- **Fully multilingual**: English, Afaan Oromoo, አማርኛ (Amharic), العربية (Arabic) with RTL support
- **PWA Installable**: Add to home screen on mobile & desktop, offline-capable via Service Worker
- **Responsive & Modern UI**: Beautiful design matching the official logo colors (purple, gold, desert theme)
- **Sections**: Hero, About, Mission & Vision, Programs, Impact, Join Us, Contact
- **Production-ready**: Clean code, accessible, fast loading, SEO-friendly meta tags

## Quick Start

```bash
# Serve locally
cd bari-charity
python3 -m http.server 8080
# or
npx serve .
```

Open http://localhost:8080

## Structure

```
bari-charity/
├── index.html          # Main app shell
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── css/styles.css      # Styles
├── js/
│   ├── i18n.js         # Translations (en, om, am, ar)
│   └── app.js          # App logic, language switcher, PWA
└── assets/
    ├── logo.png        # Official logo
    └── icon-*.png      # PWA icons
```

## Language Switcher

Language preference is saved in `localStorage`. Changing language updates the entire UI instantly, including direction (RTL for Arabic).

## Deploy

Upload the entire `bari-charity` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or traditional hosting).

Ensure HTTPS is enabled for full PWA functionality (install prompt + service worker).

## Customization

- Contact details: edit the contact section in `index.html`
- Add real donation links or payment integration as needed
- Extend translations in `js/i18n.js`

---

Built with compassion for the community.  
© 2025 Bari Charity Organisation
