# Daftar · دفتر

A personal money ledger that installs on any phone like an app. Each person signs in with their own account and sees only their own data. Admins get a back office to manage users and every transaction.

- **App** (`index.html`): accounts, income, expenses, transfers, currency exchange, debts with people, a ledger per account, CSV export, and English/Arabic.
- **Back office** (`admin.html`): a dashboard, users (add, disable, make admin, delete), and all transactions (filter, edit, delete, export).
- **Server**: [Supabase](https://supabase.com) (free tier) handles logins and the database. Security rules in `supabase/schema.sql` keep each user's data private.

---

## 1. Create the database (about 5 minutes)

1. Sign up at https://supabase.com and click **New project**. Choose a name, a database password and the region closest to you.
2. Open **SQL Editor → New query**, paste the whole of `supabase/schema.sql`, and click **Run**.
3. Open **Project Settings → API** and copy two values:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - **anon public** key
4. Put them in `config.js`:
   ```js
   window.DAFTAR_CONFIG = {
     supabaseUrl: "https://abcd1234.supabase.co",
     supabaseAnonKey: "eyJhbGciOi..."
   };
   ```
   The anon key is safe to publish. The database rules protect the data.

### Email confirmation

By default Supabase asks every new user to confirm their email before signing in.
- To let people sign in straight away, turn off **Authentication → Sign In / Providers → Email → Confirm email**.
- If you keep it on, set **Authentication → URL Configuration → Site URL** to the address where you host the app, so the confirmation link opens it.

## 2. Become the admin

**The first person to sign up becomes the admin automatically.** Sign up in the app yourself before anyone else does.

To make someone else an admin later, use **Back office → Users → (person) → Make admin**, or run this in the SQL Editor:
```sql
update public.profiles set role = 'admin' where email = 'someone@example.com';
```

## 3. Put it online (free)

The app is plain files with no build step. Any static host works:

- **GitHub Pages**: repository **Settings → Pages → Deploy from a branch → `main` / root**. The app is then at `https://<you>.github.io/<repo>/`.
- **Netlify** or **Vercel**: import the repository. There is no build command, and the publish directory is the repository root.

HTTPS is required for installing on phones. All three hosts provide it.

## 4. Install on a phone

- **iPhone (Safari)**: open the link, tap **Share → Add to Home Screen**.
- **Android (Chrome)**: open the link, tap **⋮ → Install app** (or **Add to Home screen**).

Daftar then opens full screen with its own icon and no browser bar. Each person signs in with their own email and password.

## 5. Change the app icon and name

The icon is a set of images in `icons/`. Replace them with your own image, keeping the same file names and sizes:

| File | Size | Notes |
|---|---|---|
| `icon-192.png` | 192×192 | Android, browser tab, sign-in screen |
| `icon-512.png` | 512×512 | Android splash/install |
| `icon-maskable-512.png` | 512×512 | Android adaptive icon: keep the logo inside the middle 80%, fill the whole square with background |
| `apple-touch-icon.png` | 180×180 | iPhone home screen, no transparency |

`icon.svg` is the editable source of the current icon.

To change the name, edit `"name"` and `"short_name"` in `manifest.webmanifest` and `apple-mobile-web-app-title` in `index.html`.

After changing the icon or any file, open `sw.js` and bump `VERSION` (for example `daftar-v2`) so installed phones pick up the update. On iPhone the home-screen icon only changes if you remove the app and add it again.

## Back office

Open `admin.html` (or tap your initial in the app → **Open back office**). Only admins can sign in.

- **Dashboard**: user and transaction counts, this month's income and spending per currency, newest users, and the latest transactions.
- **Users**: search and filter. Open a user to see their accounts with balances and recent transactions, rename them, make them admin, disable or enable them, or delete them with all their data. **Add user** creates a login for someone else.
- **Transactions**: every user's entries, filtered by user, type, dates or text. Tap one to change its amount, date, category or note, or to delete it. **Export CSV** downloads what's filtered.

A disabled user can no longer sign in or read their data. Deleting a user removes their data. To delete the login itself, also remove it in Supabase → **Authentication → Users**.

## Files

```
index.html            the app
admin.html            the back office
config.js             your Supabase URL and key
manifest.webmanifest  install name, colours and icons
sw.js                 offline cache (bump VERSION on each update)
css/ js/ icons/       styles, code and app icons
vendor/supabase.js    Supabase client library (v2.45.4)
supabase/schema.sql   tables and security rules
```
