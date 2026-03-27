const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Load environment variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#\s][^=]*)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const menuData = [
  {
    category: 'Gourmet Pizzas',
    items: [
      { name: 'Achaari Paneer', description: 'Achaari Paneer, Onion, Green Peppers, & Roasted Red Peppers', price: 16.99, display_order: 1 },
      { name: 'Chif Mango Pizza - Veg', description: 'Corn, Green Pepper, Hot Banana Peppers, Jalapeño Peppers, Onion, Mango', price: 16.99, display_order: 2 },
      { name: 'Chif Mango Pizza - Chicken', description: 'Chicken, Chif Mango Sauce, Hot Banana Peppers, Jalapeño Peppers, Onion, Mango', price: 16.99, display_order: 3 },
      { name: 'Shahi Paneer Pizza', description: 'Shahi Paneer, Green Peppers, Onions & Roasted Red Peppers', price: 16.99, display_order: 4 },
      { name: 'Achaari Choop Pizza', description: 'Achaari Choop, Green Peppers, Onion, Hot Peppers', price: 16.99, display_order: 5 },
      { name: 'Tandoori Choop Pizza', description: 'Tandoori Choop, Green Peppers, Onion, Hot Peppers', price: 16.99, display_order: 6 },
      { name: 'Chicken Kebab', description: 'Roasted Red Pepper, Green Pepper, Red Onion, Lamb Kebab', price: 16.99, display_order: 7 },
      { name: 'Chicken Peri Peri', description: 'Peri Peri popcorn, green peppers, onions & roasted red peppers', price: 16.99, display_order: 8 },
      { name: 'Lamb Kebab', description: 'Roasted Red Pepper, Green Pepper, Red Onion, Lamb Kebab', price: 16.99, display_order: 9 },
      { name: 'Paneer Peri Peri', description: 'Peri Peri popcorn, green peppers, onions & roasted red peppers', price: 16.99, display_order: 10 },
      { name: 'Shawarma Chicken Pizza', description: '1 Pizza with Shawarma Chicken, Tomatoes & Onions (1840-3640 Cals)', price: 16.99, display_order: 11 },
      { name: 'Tandoori Paneer Pizza', description: 'Tandoori Paneer, Green peppers, Onions & Roasted Red Peppers (230 Cals/Slice)', price: 16.99, display_order: 12 },
      { name: 'Tandoori Chicken Pizza', description: 'Tandoori Chicken, Green Peppers, Onions & Roasted Red Peppers (220 Cals/Slice)', price: 16.99, display_order: 13 },
      { name: 'Butter Chicken Pizza', description: 'Butter Chicken, Green Peppers, Onions & Roasted Red Peppers (230 Cals/Slice)', price: 16.99, display_order: 14 }
    ]
  },
  {
    category: 'Perfect Sides',
    items: [
      { name: 'Fish', description: 'Starting from $6.99', price: 6.99, display_order: 1 },
      { name: 'Fries', description: '(410 Cals) Starting from $3.99', price: 3.99, display_order: 2 },
      { name: 'Seasoned Fries', description: 'Fries with Garlic Sauce (410 Cals) $7.99', price: 7.99, display_order: 3 },
      { name: 'Loaded Fries', description: 'Loaded French Fries with Chicken or Tandoori Veggie Paneer (810 - 780 Cals) $11.99', price: 11.99, display_order: 4 },
      { name: 'Loaded Potato Wedges', description: 'Loaded Potato Wedges with Chicken or Tandoori Paneer', price: 13.99, display_order: 5 },
      { name: 'Poutine', description: 'Starting from $6.79', price: 6.79, display_order: 6 },
      { name: 'Potato Wedges - Large', description: 'Seasoned and savoury wedges (800 Cals) $4.99', price: 4.99, display_order: 7 },
      { name: 'Seasoned Potato Wedges', description: 'Potato wedges with Garlic Sauce (810 Cals) $8.99', price: 8.99, display_order: 8 },
      { name: 'Onion Rings - 10 Pcs', description: 'Large, delicious, golden onion rings (630 Cals) $5.99', price: 5.99, display_order: 9 },
      { name: 'Mozzarella Sticks (6 Pcs)', description: 'Breaded sticks of mozzarella (330 Cals) $6.99', price: 6.99, display_order: 10 },
      { name: 'Oven Baked Samosa', description: 'A tasty South Asian treat (80 Cals) $1.26', price: 1.26, display_order: 11 },
      { name: 'Soya Choop', description: 'Starting from $12.99', price: 12.99, display_order: 12 },
      { name: 'Fish & Chips Combo', description: '1 piece of perfectly fried fish, small fries, and pop bottle (910 Cals) $11.99', price: 11.99, display_order: 13 }
    ]
  },
  {
    category: 'Chicken',
    items: [
      { name: 'Classic Wings', description: 'Wings with classic Sauce Options Starting from $13.99', price: 13.99, display_order: 1 },
      { name: 'Boneless Wings (10 Pcs)', description: 'Crispy boneless wings of chicken breast available with your choice of dip', price: 12.99, display_order: 2 },
      { name: 'Chicken Sticks (4 Pcs)', description: 'Breaded slips of chicken breast meat available with your choice of dip $11.99', price: 11.99, display_order: 3 },
      { name: 'Indian Style Wings', description: 'Seasoned with hot sauce, onions, ginger, green chilli & coriander Starting from $15.99', price: 15.99, display_order: 4 },
      { name: 'Breaded Wings', description: 'Delicious breaded wings (765-915 Calories) Starting from $17.99', price: 17.99, display_order: 5 },
      { name: 'Wings Combo', description: '10 wings, small fries, and 1 bottle of pop (890-1040 Cals) $18.99', price: 18.99, display_order: 6 }
    ]
  },
  {
    category: 'Breads',
    items: [
      { name: 'Garlic Bread', description: 'Toasted garlic breadette (270 Cals) $4.99', price: 4.99, display_order: 1 },
      { name: 'Garlic Bread With Cheese', description: 'Toasted garlic breadette with a topping of cheese (845 Cals) $6.99', price: 6.99, display_order: 2 },
      { name: 'Garlic Sticks 6 Pcs', description: 'Sourdough Fingers of garlic bread topped with cheese (380 Cals) $6.99', price: 6.99, display_order: 3 },
      { name: 'Cheesy Bread', description: 'Strips of hearthy made bread topped with hairy cheese mix (780 Cals) $6.99', price: 6.99, display_order: 4 },
      { name: 'Cinnamon Bread', description: 'Strips of cinnamon flavoured bread with icing, perfect for sharing (170 Cals) $7.99', price: 7.99, display_order: 5 }
    ]
  },
  {
    category: 'Sandwiches',
    items: [
      { name: '10\' Panzerotti', description: 'A 10\' Panzerotti made to your liking with a choice of 3 toppings (1120-1930 Cals) $9.99', price: 9.99, display_order: 1 },
      { name: 'Burger Combo', description: '1 Veggie or Chicken Burger, Small Fries and 1 591ml Pop Bottle (1140-1430 Cals) $12.99', price: 12.99, display_order: 2 },
      { name: 'Philly Cheese Steak', description: 'Philly steak sandwich topped with cheese and your choice of 3 toppings (450-540 Cals) $7.49', price: 7.49, display_order: 3 }
    ]
  },
  {
    category: 'Salads',
    items: [
      { name: 'Caesar Salad', description: 'Romaine lettuce, parmesan cheese and croutons topped with Caesar dressing. Add Chicken for an additional charge (280 Cals)', price: 7.99, display_order: 1 },
      { name: 'Chicken Caesar Salad', description: 'Lettuce, parmesan cheese, croutons, cessar dressing and chicken breast strips (340 Cals)', price: 8.99, display_order: 2 },
      { name: 'Mango Chutney Salad', description: 'Mango Chutney Salad Lettuce, parmesan cheese, croutons, mango & cessar dressing', price: 8.99, display_order: 3 },
      { name: 'Greek Salad', description: 'Lettuce, red, tomatoes and onions. Feta cheese, and olives topped with Greek dressing (240 Cals)', price: 7.99, display_order: 4 }
    ]
  },
  {
    category: 'Dips',
    items: [
      { name: 'Creamy Garlic', description: '(220 Cals) $1.49', price: 1.49, display_order: 1 },
      { name: 'Cheddar Chipotle', description: '(300 Cals) $1.49', price: 1.49, display_order: 2 },
      { name: 'Ranch Dip', description: '(180 Cals) $1.49', price: 1.49, display_order: 3 },
      { name: 'Marinara Dip', description: '(35 Cals) $1.49', price: 1.49, display_order: 4 }
    ]
  },
  {
    category: 'Drinks',
    items: [
      { name: '591 ml Bottles', description: 'Available in various flavors', price: 2.49, display_order: 1 },
      { name: '2L Pop', description: 'Available in various flavors', price: 3.99, display_order: 2 }
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Dessert', description: 'Various dessert options available', price: 0.00, display_order: 1 }
    ]
  }
];

async function addMoreMenu() {
  try {
    // Get existing categories
    const { data: existingCats, error: getCatsErr } = await supabase.from('categories').select('id, name');
    if (getCatsErr) throw getCatsErr;

    const categoryMap = {};
    existingCats.forEach(c => {
      categoryMap[c.name] = c.id;
    });

    // Get new category names that don't exist
    const newCategoryNames = menuData.map(md => md.category).filter(name => !categoryMap[name]);

    // Insert new categories
    if (newCategoryNames.length > 0) {
      const categoriesToInsert = newCategoryNames.map((name, idx) => ({
        name: name,
        display_order: 6 + idx
      }));

      const { data: insertedCats, error: catErr } = await supabase.from('categories').insert(categoriesToInsert).select();
      if (catErr) throw catErr;

      insertedCats.forEach(c => {
        categoryMap[c.name] = c.id;
      });
    }

    // Prepare menu items to insert
    const itemsToInsert = [];
    menuData.forEach(catData => {
      const category_id = categoryMap[catData.category];
      if (category_id) {
        catData.items.forEach(item => {
          itemsToInsert.push({
            name: item.name,
            description: item.description,
            price: item.price,
            category_id: category_id,
            image_url: '/images/pizza-placeholder.jpg',
            is_available: true,
            display_order: item.display_order,
          });
        });
      }
    });

    console.log(`Inserting ${itemsToInsert.length} menu items...`);
    const { error: itemErr } = await supabase.from('menu_items').insert(itemsToInsert);
    if (itemErr) throw itemErr;

    console.log('Menu update complete!');
  } catch (error) {
    console.error('Error updating menu:', error);
  }
}

addMoreMenu();
