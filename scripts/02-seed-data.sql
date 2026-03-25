-- Mama Sam Pizza - Seed Data
-- Insert initial data for the application

-- Insert Admin Credentials
INSERT INTO admins (email, password_hash, full_name, role) VALUES
  ('admin@mamasam.com', crypt('MamaSam@2024', gen_salt('bf')), 'Primary Admin', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Insert Categories
INSERT INTO categories (name, description, display_order, is_active) VALUES
  ('Pizzas', 'Our signature wood-fired pizzas', 1, true),
  ('Pasta', 'Fresh homemade pasta dishes', 2, true),
  ('Appetizers', 'Starters and sides', 3, true),
  ('Desserts', 'Sweet treats', 4, true),
  ('Beverages', 'Drinks and beverages', 5, true)
ON CONFLICT (name) DO NOTHING;

-- Insert Menu Items (Pizzas)
INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Margherita', 'Fresh mozzarella, basil, tomato sauce', 14.99, 20, true, false, 1, true 
FROM categories WHERE name = 'Pizzas'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Pepperoni', 'Classic pepperoni with mozzarella cheese', 16.99, 20, false, false, 2, true 
FROM categories WHERE name = 'Pizzas'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Quattro Formaggi', 'Four cheese blend pizza', 17.99, 22, true, false, 3, true 
FROM categories WHERE name = 'Pizzas'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Diavola', 'Spicy pepperoni and chili peppers', 17.99, 20, false, true, 4, true 
FROM categories WHERE name = 'Pizzas'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Vegetariana', 'Mixed vegetables and herbs', 15.99, 20, true, false, 5, true 
FROM categories WHERE name = 'Pizzas'
ON CONFLICT DO NOTHING;

-- Insert Menu Items (Pasta)
INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Pasta Carbonara', 'Classic Roman pasta with bacon and cream', 13.99, 15, false, false, 1, true 
FROM categories WHERE name = 'Pasta'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Pasta Bolognese', 'Rich meat sauce with fresh pasta', 14.99, 18, false, false, 2, true 
FROM categories WHERE name = 'Pasta'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Pasta Primavera', 'Fresh vegetables with light olive oil', 12.99, 15, true, false, 3, true 
FROM categories WHERE name = 'Pasta'
ON CONFLICT DO NOTHING;

-- Insert Menu Items (Appetizers)
INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Garlic Bread', 'Crispy bread with garlic and herbs', 4.99, 8, true, false, 1, true 
FROM categories WHERE name = 'Appetizers'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Mozzarella Sticks', 'Golden fried mozzarella', 6.99, 10, true, false, 2, true 
FROM categories WHERE name = 'Appetizers'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Calamari', 'Crispy fried squid with marinara', 9.99, 12, false, false, 3, true 
FROM categories WHERE name = 'Appetizers'
ON CONFLICT DO NOTHING;

-- Insert Menu Items (Desserts)
INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Tiramisu', 'Classic Italian dessert', 5.99, 0, true, false, 1, true 
FROM categories WHERE name = 'Desserts'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Panna Cotta', 'Creamy Italian custard', 4.99, 0, true, false, 2, true 
FROM categories WHERE name = 'Desserts'
ON CONFLICT DO NOTHING;

-- Insert Menu Items (Beverages)
INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Soft Drinks', 'Various sodas and juices', 2.99, 0, true, false, 1, true 
FROM categories WHERE name = 'Beverages'
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, prep_time, is_vegetarian, is_spicy, display_order, is_available) 
SELECT id, 'Italian Wine', 'Selection of fine Italian wines', 8.99, 0, true, false, 2, true 
FROM categories WHERE name = 'Beverages'
ON CONFLICT DO NOTHING;

-- Insert Offers
INSERT INTO offers (title, description, discount_type, discount_value, code, start_date, end_date, is_active) VALUES
  ('Welcome Discount', 'Get 15% off on your first order', 'percentage', 15, 'WELCOME15', NOW(), NOW() + INTERVAL '30 days', true),
  ('Friday Special', 'Buy one pizza, get 20% off another', 'percentage', 20, 'FRIDAY20', NOW(), NOW() + INTERVAL '90 days', true),
  ('Group Feast', 'Flat $10 discount on orders over $50', 'fixed', 10, 'GROUP10', NOW(), NOW() + INTERVAL '60 days', true)
ON CONFLICT (code) DO NOTHING;

-- Insert Testimonials
INSERT INTO testimonials (customer_name, rating, content, is_approved) VALUES
  ('Maria Giuseppe', 5, 'The best pizza I have ever tasted! The crust is perfectly crispy and the ingredients are so fresh.', true),
  ('John Smith', 5, 'Fantastic experience from start to finish. The delivery was fast and the food was piping hot.', true),
  ('Sarah Johnson', 4, 'Great pasta dishes and friendly staff. Will definitely order again!', true),
  ('Michael Brown', 5, 'Authentic Italian flavors that transport you straight to Italy. Highly recommended!', true),
  ('Emily Davis', 5, 'The tiramisu is to die for! Best dessert Ive had in a long time.', true)
ON CONFLICT DO NOTHING;

-- Insert Locations
INSERT INTO locations (name, address, city, phone, email, opening_hours, is_active) VALUES
  ('Downtown - Main Street', '123 Main Street', 'Springfield', '555-0101', 'downtown@mamasam.com', 'Mon-Sun: 11AM-11PM', true),
  ('Uptown - Park Avenue', '456 Park Avenue', 'Springfield', '555-0102', 'uptown@mamasam.com', 'Mon-Sun: 11AM-10PM', true),
  ('Westside - Oak Road', '789 Oak Road', 'Springfield', '555-0103', 'westside@mamasam.com', 'Tue-Sun: 12PM-11PM', true)
ON CONFLICT DO NOTHING;

-- Insert Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, is_published, published_at) VALUES
  ('The Art of Making Perfect Pizza', 'art-of-perfect-pizza', 'Learn the secrets behind our wood-fired pizza..', 'The wood-fired oven is key to our pizza making process. We use authentic Italian techniques passed down through generations...', 'Mama Sam', true, NOW()),
  ('Italian Cooking Traditions', 'italian-cooking-traditions', 'Discover the rich culinary heritage...', 'Italian cuisine is more than just food, it''s a way of life. Every dish tells a story of tradition and family...', 'Chef Marco', true, NOW() - INTERVAL '7 days'),
  ('Meet Our Team', 'meet-our-team', 'Get to know the passionate people behind Mama Sam...', 'Our team is dedicated to bringing authentic Italian cuisine to your table...', 'Mama Sam', true, NOW() - INTERVAL '14 days')
ON CONFLICT (slug) DO NOTHING;
