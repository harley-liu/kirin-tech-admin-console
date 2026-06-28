-- ============================================================================
-- Admin panel support: stock quantity tracking + admin-only write access
-- ============================================================================

-- 1. Real inventory quantity (in addition to the existing in_stock flag)
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_quantity INTEGER NOT NULL DEFAULT 0;

-- Backfill a sensible starting quantity from the existing in_stock flag
UPDATE products
SET stock_quantity = CASE WHEN in_stock THEN 25 ELSE 0 END
WHERE stock_quantity = 0;

-- Keep updated_at current whenever a product row is edited
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_set_updated_at ON products;
CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. Admin allow-list
--    Signing in with Supabase Auth is NOT enough on its own to gain write
--    access -- a user's id must also exist in this table. This means even if
--    public sign-up is left enabled on the Supabase project, a random new
--    account still cannot edit the store.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- A signed-in user may only check their own membership row (not list admins)
CREATE POLICY "admin_users_read_own_row" ON admin_users FOR SELECT
  TO authenticated USING (user_id = auth.uid());

-- ----------------------------------------------------------------------------
-- 3. Write policies for categories -- admins only
--    (SELECT policies for anon/authenticated already exist from the
--    original migration and are left untouched, so the public store page
--    keeps working exactly as before.)
-- ----------------------------------------------------------------------------
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "admin_update_categories" ON categories FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "admin_delete_categories" ON categories FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

-- ----------------------------------------------------------------------------
-- 4. Write policies for products -- admins only
-- ----------------------------------------------------------------------------
CREATE POLICY "admin_insert_products" ON products FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "admin_update_products" ON products FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));

CREATE POLICY "admin_delete_products" ON products FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()));
