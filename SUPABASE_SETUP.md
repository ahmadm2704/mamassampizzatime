# Mama Sam Pizza - Supabase Setup Guide

## Overview
This project is configured to use Supabase as the backend database. Follow the steps below to set up Supabase for your Mama Sam Pizza application.

---

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or sign up
3. Create a new account or log in if you already have one

---

## Step 2: Create a New Project

1. Click "New project" in your Supabase dashboard
2. Fill in the project details:
   - **Project name**: `mama-sam-pizza` (or your preferred name)
   - **Database password**: Create a strong password (save this!)
   - **Region**: Select the region closest to your users
3. Click "Create new project" and wait for it to initialize (2-3 minutes)

---

## Step 3: Get Your API Keys

1. Once your project is created, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (anon public key section)
   - **anon public** key (under "Project API keys")

3. You'll need:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key

---

## Step 4: Set Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 3.

---

## Step 5: Create Database Schema

1. In Supabase, go to **SQL Editor**
2. Click **"New query"**
3. Open the file `scripts/01-init-schema.sql` from this project
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** to execute the migration

This will create all necessary tables with proper indexes and triggers.

---

## Step 6: Seed Initial Data

1. In Supabase SQL Editor, click **"New query"** again
2. Open the file `scripts/02-seed-data.sql`
3. Copy the entire SQL content
4. Paste it into a new SQL Editor tab
5. Click **"Run"** to insert sample data

This will populate your database with:
- Menu categories
- Sample menu items (pizzas, pasta, appetizers, desserts, beverages)
- Special offers
- Sample testimonials
- Restaurant locations
- Blog posts

---

## Step 7: Verify Your Database

1. Go to **Table Editor** in Supabase
2. You should see all these tables:
   - users
   - categories
   - menu_items
   - orders
   - order_items
   - offers
   - reservations
   - testimonials
   - blog_posts
   - contact_messages
   - gallery
   - locations

---

## Step 8: Update Application Code (Optional)

The application is already configured to use Supabase hooks from `hooks/use-supabase.ts`.

To use the hooks in your React components:

```tsx
import { useMenuItems, useCategories, useOffers } from '@/hooks/use-supabase';

export default function MenuPage() {
  const { items, loading, error } = useMenuItems();
  const { categories } = useCategories();
  const { offers } = useOffers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Render menu items */}
    </div>
  );
}
```

---

## Admin Portal Credentials

**Default Admin Login:**
- Email: `admin@mamasam.com`
- Password: `MamaSam@2024`

**Important**: Change these credentials immediately after first login for security.

---

## API Functions Available

### Data Fetching Hooks

- `useMenuItems()` - Fetch all available menu items
- `useCategories()` - Fetch all menu categories
- `useMenuItemsByCategory(categoryId)` - Fetch items from a specific category
- `useOffers()` - Fetch active promotional offers
- `useCreateReservation()` - Create a table reservation
- `useCreateContactMessage()` - Submit a contact form
- `useCreateOrder()` - Create a new order

### Direct Supabase Client

For more complex queries, you can use the Supabase client directly:

```tsx
import { supabase } from '@/lib/supabase';

// Fetch data
const { data, error } = await supabase
  .from('menu_items')
  .select('*')
  .eq('category', 'pizzas');

// Insert data
const { data, error } = await supabase
  .from('contact_messages')
  .insert([{ name: 'John', email: 'john@example.com', message: '...' }]);

// Update data
const { data, error } = await supabase
  .from('orders')
  .update({ status: 'completed' })
  .eq('id', orderId);
```

---

## Row Level Security (RLS) - Optional

For enhanced security, you can enable Row Level Security (RLS) on your tables:

1. Go to **Authentication** > **Policies** in Supabase
2. Select a table
3. Enable RLS and create policies based on your needs

Example policies:
- Anyone can read menu_items and categories
- Only authenticated users can view their own orders
- Only admins can modify menu items
- Anyone can insert contact_messages

---

## Troubleshooting

**Issue**: "Error: Invalid API key"
- **Solution**: Check that your `.env.local` file has the correct URL and key

**Issue**: "Table does not exist"
- **Solution**: Make sure you ran the `01-init-schema.sql` migration

**Issue**: "Permission denied" errors
- **Solution**: Enable public read access for public-facing tables or configure RLS policies

**Issue**: Data not loading
- **Solution**: Check browser console for errors, verify Supabase URL and key are correct

---

## Database Schema Overview

### Tables

**users** - User accounts and admin credentials
**categories** - Menu categories
**menu_items** - Individual menu items with pricing
**orders** - Customer orders
**order_items** - Items within each order
**offers** - Promotional discounts and deals
**reservations** - Table reservations
**testimonials** - Customer reviews
**blog_posts** - Blog articles
**contact_messages** - Contact form submissions
**gallery** - Photo gallery images
**locations** - Restaurant locations

---

## Next Steps

1. Set up environment variables
2. Run the database migrations
3. Seed sample data
4. Test the application locally
5. Deploy to Vercel
6. Update admin credentials

For more information, visit [Supabase Documentation](https://supabase.com/docs).

---

## Support

If you encounter issues:
1. Check the Supabase dashboard for error logs
2. Review the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Contact Supabase support at [supabase.com/support](https://supabase.com/support)
