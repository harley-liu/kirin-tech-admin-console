
-- Product categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products for the online store
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  compare_at_price NUMERIC(10,2),
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  specs JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Categories are public read
CREATE POLICY "select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Products are public read
CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('Computer Peripherals', 'computer-peripherals', 'Keyboards, mice, monitors, and other computer accessories'),
  ('IP Phones', 'ip-phones', 'VoIP phones and phone handsets for business communication');

-- Insert sample products - Computer Peripherals
INSERT INTO products (name, slug, description, price, compare_at_price, image_url, category_id, in_stock, featured, specs) VALUES
  ('Logitech MX Master 3S', 'logitech-mx-master-3s', 'Advanced wireless mouse with MagSpeed scroll, ergonomic design, and multi-device connectivity.', 149.00, 169.00, 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, true, '{"connectivity": "Bluetooth + USB-C", "battery": "70 days", "dpi": "8000", "weight": "141g"}'),
  ('Keychron K2 Pro', 'keychron-k2-pro', 'Wireless mechanical keyboard with hot-swappable switches and RGB backlight.', 119.00, 139.00, 'https://images.pexels.com/photos/841227/pexels-photo-841227.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, true, '{"switches": "Hot-swappable", "connectivity": "Bluetooth + USB-C", "layout": "84-key", "battery": "200 hours"}'),
  ('Samsung 27" 4K Monitor', 'samsung-27-4k-monitor', 'Ultra HD 4K monitor with IPS panel, 60Hz refresh rate, and USB-C connectivity.', 449.00, 529.00, 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, false, '{"resolution": "3840x2160", "panel": "IPS", "refresh_rate": "60Hz", "ports": "HDMI, DisplayPort, USB-C"}'),
  ('Jabra Evolve2 85', 'jabra-evolve2-85', 'Professional wireless headset with ANC, 37-hour battery, and Microsoft Teams certification.', 379.00, 449.00, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, false, '{"anc": "Active Noise Cancellation", "battery": "37 hours", "connectivity": "Bluetooth 5.1 + USB", "certification": "Microsoft Teams"}'),
  ('Anker 575 USB-C Hub', 'anker-575-usb-c-hub', '13-in-1 USB-C docking station with 4K HDMI, Ethernet, and 100W power delivery.', 89.00, 109.00, 'https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, false, '{"ports": "13-in-1", "power_delivery": "100W", "ethernet": "Gigabit", "hdmi": "4K@60Hz"}'),
  ('Webcam Logitech Brio 4K', 'webcam-logitech-brio-4k', '4K HDR business webcam with auto light correction and noise-cancelling mic.', 199.00, 229.00, 'https://images.pexels.com/photos/2749737/pexels-photo-2749737.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'computer-peripherals'), true, false, '{"resolution": "4K HDR", "fps": "90fps at 1080p", "fov": "90°", "mic": "Noise-cancelling"}');

-- Insert sample products - IP Phones
INSERT INTO products (name, slug, description, price, compare_at_price, image_url, category_id, in_stock, featured, specs) VALUES
  ('Yealink T46U', 'yealink-t46u', 'Premium IP phone with 4.3" colour display, 16 line keys, and Optima HD voice technology.', 289.00, 329.00, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), true, true, '{"display": "4.3 inch colour", "lines": "16 SIP lines", "power": "PoE", "codec": "Opus, G.722"}'),
  ('Cisco 8845', 'cisco-8845', 'Unified IP phone with 5" colour display, HD video, and wideband audio.', 449.00, 519.00, 'https://images.pexels.com/photos/1092305/pexels-photo-1092305.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), true, true, '{"display": "5 inch colour", "video": "720p HD", "lines": "5 SIP lines", "codec": "G.722, Opus"}'),
  ('Grandstream GXP2170', 'grandstream-gxp2170', 'High-end IP phone with 4.3" LCD, 12 line keys, Bluetooth, and dual Gigabit ports.', 179.00, 209.00, 'https://images.pexels.com/photos/1092305/pexels-photo-1092305.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), true, false, '{"display": "4.3 inch LCD", "lines": "12 line keys", "bluetooth": "Yes", "ports": "Dual Gigabit"}'),
  ('Poly VVX 450', 'poly-vvx-450', 'Business IP phone with 4.3" colour display, 12 line keys, and Poly HD Voice.', 259.00, 299.00, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), true, false, '{"display": "4.3 inch colour", "lines": "12 line keys", "power": "PoE", "codec": "Poly HD Voice"}'),
  ('Yealink T33G', 'yealink-t33g', 'Entry-level IP phone with 2.4" colour display, 4 line keys, and HD voice.', 99.00, 119.00, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), true, false, '{"display": "2.4 inch colour", "lines": "4 line keys", "power": "PoE", "codec": "HD Voice"}'),
  ('Fanvil X5S', 'fanvil-x5s', 'Enterprise IP phone with 3.5" colour LCD, 12 line keys, and HD audio with wideband codec.', 169.00, 199.00, 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', (SELECT id FROM categories WHERE slug = 'ip-phones'), false, false, '{"display": "3.5 inch LCD", "lines": "12 line keys", "power": "PoE + 12V DC", "codec": "G.722, Opus"}');
