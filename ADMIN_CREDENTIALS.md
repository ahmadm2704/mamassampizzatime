# Mama Sam Pizza - Admin Portal Credentials & Information

## Default Admin Credentials

| Field | Value |
|-------|-------|
| **Admin Email** | admin@mamasam.com |
| **Admin Password** | MamaSam@2024 |
| **Portal URL** | `/admin` |

⚠️ **IMPORTANT**: Change these credentials immediately after your first login for security.

---

## How to Access Admin Portal

1. Open your application in a browser
2. Navigate to `/admin` route
3. Log in with the credentials above
4. Update your password in the settings

---

## Admin Portal Features

### Dashboard
- Overview of orders, revenue, and customers
- Recent activity and statistics
- Quick access to all admin functions

### Menu Management
- Create, edit, and delete menu items
- Organize items by category
- Manage pricing and availability
- Track preparation times

### Order Management
- View all customer orders
- Update order status
- Track order progress
- View delivery details

### Customer Management
- View customer profiles
- Track order history
- Manage loyalty points
- View customer information

### Reservations
- View table reservations
- Confirm or cancel reservations
- Track reservation details

### Offers & Deals
- Create promotional offers
- Set discount codes
- Track offer usage
- Manage validity dates

### Blog & Content
- Create and publish blog posts
- Manage testimonials
- Upload gallery images
- Manage location information

### Settings
- Update restaurant information
- Configure business hours
- Manage team members
- View system settings

---

## Security Best Practices

1. **Change Default Password Immediately**
   - Log in with default credentials
   - Go to Settings > Security
   - Change password to a strong one

2. **Use Strong Passwords**
   - Minimum 12 characters
   - Mix uppercase, lowercase, numbers, symbols
   - Example: `M@m@S@m2024!Secure`

3. **Secure Your Account**
   - Enable two-factor authentication if available
   - Use unique passwords for different accounts
   - Keep your credentials confidential

4. **Regular Backups**
   - Supabase automatically backs up your data
   - Verify backups in Supabase dashboard periodically

5. **Access Control**
   - Create separate admin accounts for team members
   - Assign appropriate roles and permissions
   - Audit access logs regularly

---

## First Login Checklist

- [ ] Log in with default credentials
- [ ] Navigate to `/admin`
- [ ] Go to Settings section
- [ ] Change admin password
- [ ] Update restaurant information
- [ ] Add menu items/categories
- [ ] Upload restaurant images
- [ ] Test order creation
- [ ] Verify email notifications
- [ ] Set up additional admin users if needed

---

## Common Admin Tasks

### Adding a New Menu Item
1. Go to Admin > Menu Management
2. Click "Add New Item"
3. Fill in item details (name, price, category, description)
4. Set preparation time and availability
5. Click "Save"

### Creating a New Offer
1. Go to Admin > Offers & Deals
2. Click "Create New Offer"
3. Set discount amount and validity dates
4. Generate or set a promo code
5. Click "Create Offer"

### Processing an Order
1. Go to Admin > Orders
2. Click on the order to view details
3. Update status as order progresses
4. Send notifications to customer
5. Mark as completed when done

### Managing Reservations
1. Go to Admin > Reservations
2. Review pending reservations
3. Confirm or reject reservations
4. Send confirmation to customer
5. Track table availability

---

## Support & Troubleshooting

**Forgot Password?**
- There is no automatic reset in the mock system
- You'll need to contact your developer to reset

**Can't Access Admin Panel?**
- Clear browser cache and cookies
- Try incognito/private browser window
- Check that you're using the correct admin URL

**Data Not Showing?**
- Ensure Supabase is connected (check `.env.local`)
- Verify database migrations have been run
- Check browser console for errors

**Performance Issues?**
- Check Supabase database status
- Review current connections
- Optimize queries for large datasets

---

## Database Connection

Once you've set up Supabase:

1. Create `.env.local` file in project root
2. Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```
3. Run migrations from `scripts/01-init-schema.sql`
4. Seed data from `scripts/02-seed-data.sql`

See `SUPABASE_SETUP.md` for detailed instructions.

---

## Contact

For technical support or questions about the admin portal:
- Check the documentation in `SUPABASE_SETUP.md`
- Review the project README
- Contact your development team

---

**Last Updated**: 2024
**Version**: 1.0
