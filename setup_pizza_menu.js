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

const categories = [
  { name: 'Everyday Value Deals', display_order: 1 },
  { name: 'Signature Deals Menu', display_order: 2 },
  { name: 'Signature Box Deals', display_order: 3 },
  { name: 'Build Your Own', display_order: 4 },
  { name: 'Traditional Pizzas', display_order: 5 },
  { name: 'Gourmet Pizzas', display_order: 6 },
  { name: 'Perfect Sides', display_order: 7 },
  { name: 'Chicken', display_order: 8 },
  { name: 'Breads', display_order: 9 },
  { name: 'Sandwiches', display_order: 10 },
  { name: 'Salads', display_order: 11 },
  { name: 'Dips', display_order: 12 },
];

const menuData = [
  {
    category: 'Everyday Value Deals',
    items: [
      { name: 'Pick-Up Cheese Special', description: '1 Pizza - Cheese Only', price: 5.00, display_order: 1 },
      { name: 'Student Special', description: '2 Medium Pizzas with 1 topping on each (200-350 Cals/Slice. 20 Slices)', price: 17.69, display_order: 2 },
      { name: 'Family Feast Supreme', description: '3 Pizzas (9 Toppings Combined) + 3 Dips + 2L Bottle', price: 38.99, display_order: 3 },
      { name: 'Classic Combo Deal', description: '1 Pizza with 3 Toppings & 1 Pop & 1 Dipping Sauce', price: 14.99, display_order: 4 },
      { name: 'Value Feast Pizza', description: 'Single Pizza with 1 Topping & 1 Dip', price: 11.99, display_order: 5 },
      { name: 'Double Cheese Combo', description: '2 Cheese or Pepperoni Pizzas + 1 591ml Bottle + 2 Dips (240-1540 Cals/Serving, Serves 8)', price: 20.99, display_order: 6 },
    ]
  },
  {
    category: 'Signature Deals Menu',
    items: [
      { name: 'Mega Combo Deal', description: '2 Pizzas (6 Toppings Combined) + 2 Dips + Add 2L Pop for $3.99', price: 27.99, display_order: 1 },
      { name: 'Grand Feast', description: '1 Pizza (3 Toppings) & Wings 10 Classic Combo with 591 ml Bottle +1 Dip +1 Sauce', price: 28.99, display_order: 2 },
      { name: 'Double Topping Feast', description: '2 Pizzas with 4 combined toppings & 2 Dips', price: 22.99, display_order: 3 },
      { name: 'Special #7', description: 'Loaded French Fries with Butter Chicken or Tandoori Veggie Paneer (810-980 Cals)', price: 11.99, display_order: 4 },
    ]
  },
  {
    category: 'Signature Box Deals',
    items: [
      { name: 'Veggie Bite Box', description: '1 Tandoori Paneer Loaded Fries + 1 Pizza Sub with 3 toppings or Loaded Potato Wedges', price: 21.99, display_order: 1 },
      { name: 'Chicken Bite Box', description: '10 Classic Wings + 1 Pizza Sub with 3 topping or Loaded Fries or Loaded Potato Wedges or 6 pcs Chicken Strips', price: 23.99, display_order: 2 },
      { name: 'Square Pizza Deal', description: '1 Square Pizza with 1 topping & 2 Dipping Sauce', price: 26.99, display_order: 3 },
    ]
  },
  {
    category: 'Build Your Own',
    items: [
      { name: 'Make Your Own Small', description: 'Single Small Pizza with Pizza Sauce & Mozzarella Cheese', price: 8.99, display_order: 1 },
      { name: 'Make Your Own Medium', description: 'Single Medium Pizza with Pizza Sauce & Mozzarella Cheese', price: 10.99, display_order: 2 },
      { name: 'Make Your Own Large', description: 'Single Large Pizza with Pizza Sauce & Mozzarella Cheese', price: 12.99, display_order: 3 },
      { name: 'Make Your Own X-Large', description: 'Single X-Large Pizza with Pizza Sauce & Mozzarella Cheese', price: 14.99, display_order: 4 },
      { name: 'Make Your Own Square', description: 'Single Square Pizza with Pizza Sauce & Mozzarella Cheese and one topping (Toppings Extra)', price: 24.99, display_order: 5 },
    ]
  },
  {
    category: 'Traditional Pizzas',
    items: [
      { name: 'Canadian Pizza', description: 'Pepperoni, Mushrooms & Bacon (260 Cals/Slice)', price: 16.99, display_order: 1 },
      { name: 'Meat Lovers Pizza', description: 'Ground Beef, Pepperoni, Bacon & Sausage (330 Cals/Slice)', price: 16.99, display_order: 2 },
      { name: 'Meatball Pizza', description: 'Juicy Meatballs, Green Peppers & Onions (230 Cals/Slice)', price: 16.99, display_order: 3 },
      { name: 'Greek Pizza', description: 'Black Olives, Sliced Tomatoes, Onions & Feta Cheese (220 Cals/Slice)', price: 16.99, display_order: 4 },
      { name: 'Hawaiian Pizza', description: 'Ham, Pineapple & Extra Cheese (220 Cals/Slice)', price: 16.99, display_order: 5 },
      { name: 'Buffalo Chicken Pizza', description: 'Buffalo Chicken, Onions & Hot Peppers (210 Cals/Slice)', price: 16.99, display_order: 6 },
      { name: 'Health Smart Pizza', description: 'Green peppers, Onions, Mushrooms & Broccoli (190 Cals/Slice)', price: 16.99, display_order: 7 },
      { name: 'Canadian Veggie Pizza', description: 'Green Peppers, Tomatoes, Mushrooms & Green Olives (210 Cals/Slice)', price: 16.99, display_order: 8 },
      { name: 'Mexican Pizza', description: 'Ground Beef, Tomatoes, Onions & Jalapeno Peppers (220 Cals/Slice)', price: 16.99, display_order: 9 },
      { name: 'Chicken Deluxe Pizza', description: 'Chicken, Mushrooms, Green Peppers & Onions (210 Cals/Slice)', price: 16.99, display_order: 10 },
      { name: 'Spicy Italian Pizza', description: 'Thin Crust, Hot Italian Sausage, Ham & Roasted Red Peppers (240 Cals/Slice)', price: 16.99, display_order: 11 },
      { name: 'Garden Veggie Pizza', description: 'Green Peppers, Onions, Tomatoes & Green Olives (210 Cals/Slice)', price: 16.99, display_order: 12 },
      { name: 'Bacon Cheeseburger Pizza', description: 'Bacon, Ground Beef, Cheddar & Mozzarella Cheese (280 Cals/Slice)', price: 16.99, display_order: 13 },
      { name: 'BBQ Chicken Pizza', description: 'BBQ Chicken, Mushrooms & Red Onions (210 Cals/Slice)', price: 16.99, display_order: 14 },
      { name: 'Spicy Veggie Deluxe', description: 'Single Pizza with Green peppers, Onions, Tomatoes & Hot Peppers (200 Cals/Slice)', price: 16.99, display_order: 15 },
      { name: 'Signature Veggie Corn', description: '1 Pizza with Garlic Sauce Base, Corn, Green Pepper, Mushrooms & Red Onion (1640-3040 Cals)', price: 16.99, display_order: 16 },
    ]
  }
];

async function setupMenu() {
  try {
    console.log('Clearing existing menu items...');
    const { error: deleteItemsErr } = await supabase.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteItemsErr) throw deleteItemsErr;

    console.log('Clearing existing categories...');
    const { error: deleteCatsErr } = await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteCatsErr) throw deleteCatsErr;

    console.log('Inserting new categories...');
    const { data: insertedCats, error: catErr } = await supabase.from('categories').insert(categories).select();
    if (catErr) throw catErr;

    const categoryMap = {};
    insertedCats.forEach(c => {
      categoryMap[c.name] = c.id;
    });

    console.log('Inserting new menu items...');
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

    const { error: itemErr } = await supabase.from('menu_items').insert(itemsToInsert);
    if (itemErr) throw itemErr;

    console.log('Menu setup complete!');
  } catch (error) {
    console.error('Error setting up menu:', error);
  }
}

setupMenu();
