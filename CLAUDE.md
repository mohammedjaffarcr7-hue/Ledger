# Daftar

Static PWA (index.html = app, admin.html = back office) on Supabase. No build step.
- Data rules live in `supabase/schema.sql` (row-level security). Keep each user's data private.
- Design: follow `DESIGN-RESOURCES.md` ("Ledger paper"). One accent colour, no gradients or drop shadows, no violet.
- Check UI changes in a real browser (Playwright CLI) at 390 px and 1280 px, in English and Arabic.
- Bump `VERSION` in `sw.js` on every deploy.
