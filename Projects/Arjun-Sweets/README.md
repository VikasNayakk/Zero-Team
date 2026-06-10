# Arjun Sweets — Static site scaffold

This is a small static prototype for the `Arjun Sweets` website. Files:

- `index.html` — homepage
- `menu.html` — menu / price list
- `contact.html` — contact / order form (mailto prototype)
- `styles.css` — simple styles

To view locally, open `index.html` in your browser or run a simple HTTP server:

```powershell
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

Next steps (optional): integrate a backend for orders, add images, add SEO metadata, and set up hosting (Vercel / Netlify / any static host).

Assets included:
- `assets/logo.svg` — simple logo placeholder
- `assets/sweet1.svg` — sample sweet image placeholder
- `assets/icons/phone.svg`, `assets/icons/location.svg` — small SVG icons used in contact

To replace assets, put files with the same names into the `assets/` folder.

UI Prototype notes (client-side only)
- This prototype is UI-only — no backend or real payments.
- Cart is client-side and stored in `localStorage`. Use "Add" on `menu.html` to add items, open Cart to view/remove.
- Reservation is a mock modal (no server). Use "Reserve" to open and try date/time inputs.
- Scripts: `app.js` — handles cart, toast, and reservation modal.

Open `index.html` or `menu.html` and test interactions. Replace placeholder images in `assets/` as needed.
