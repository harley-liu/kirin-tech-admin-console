# Store Admin — One-Time Setup

The admin panel lives at **`/admin`** on your site (e.g. `https://kirintechnologies.com.au/admin`).
It is not linked from the public navigation — only people who know the URL (and who are on the
admin allow-list below) can sign in.

This page lets you manage **Categories** and **Products** (including price and stock quantity)
without ever opening the Supabase dashboard day-to-day. The steps below are a **one-time setup**
to create your login — after that, everything happens through the `/admin` page itself.

## 1. Run the new migration

`supabase/migrations/20260628120000_admin_panel.sql` adds:
- a `stock_quantity` column on `products`
- an `admin_users` allow-list table
- write (INSERT/UPDATE/DELETE) policies on `categories` and `products`, restricted to users
  who appear in `admin_users`

Apply it the same way you applied the original migration (Supabase Dashboard → SQL Editor → paste
the file contents → Run, or via the Supabase CLI if you use one).

## 2. Create your admin login

In the Supabase Dashboard:

1. Go to **Authentication → Users → Add user**
2. Enter your email and a password, and create the user
3. Copy the new user's **UID** (shown in the users list)

## 3. Add yourself to the allow-list

Still in the Supabase Dashboard, go to **SQL Editor** and run (replace both placeholders):

```sql
insert into admin_users (user_id, email)
values ('PASTE-USER-UID-HERE', 'you@kirintechnologies.com.au');
```

That's it — go to `/admin` on your site and sign in with that email/password.

## Adding more admins later

Repeat steps 2–3 for anyone else who should have access. Each person needs their own login.

## Optional extra hardening

Supabase projects allow public self-sign-up by default. Since write access is gated by the
`admin_users` allow-list (not just "any logged-in user"), a random sign-up still can't edit your
store — but if you'd like to close that door entirely, go to **Authentication → Providers → Email**
and turn off "Allow new users to sign up".
