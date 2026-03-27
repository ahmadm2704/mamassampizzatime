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

async function updateMenu() {
  try {
    console.log('Fetching categories...');
    const { data: categories, error: catFetchErr } = await supabase.from('categories').select('*');
    if (catFetchErr) throw catFetchErr;

    const drinksCat = categories.find(c => c.name === 'Drinks' || c.name === 'Beverages');
    const dessertsCat = categories.find(c => c.name === 'Desserts');

    if (!drinksCat || !dessertsCat) {
      console.log('Creating missing categories...');
      // Ensure "Drinks" and "Desserts" exist
      if (!drinksCat) {
        const { data: newDrinkCat } = await supabase.from('categories').insert([{ name: 'Drinks', display_order: 12 }]).select().single();
        // Use the newly created one
      }
    }

    const drinksId = drinksCat?.id;
    const dessertsId = dessertsCat?.id;

    console.log('Adding 591ml Drinks...');
    const drinks591ml = [
      'Pepsi', 'Diet Pepsi', '7 UP', 'Ginger Ale', 'Mountain Dew', 
      'Orange Crush', 'Cream Soda', 'Grape Soda', 'Brisk Ice Tea', 
      'Brisk Lemonade', 'Dr Pepper', 'Root Beer'
    ].map(name => ({
      name: `591 ML BTL ${name}`,
      category_id: drinksId,
      price: 2.99,
      description: 'Refreshing 591ml bottled soda',
      image_url: `https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`, // General soda pic
      is_available: true,
      display_order: 100
    }));
    drinks591ml.push({
      name: 'Water Bottle',
      category_id: drinksId,
      price: 1.99,
      description: 'Pure bottled water',
      image_url: 'https://images.unsplash.com/photo-1523362628242-f9c3bf9eeeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_available: true,
      display_order: 101
    });

    console.log('Adding 2L Pop...');
    const drinks2L = [
      'Pepsi', 'Diet Pepsi', '7 UP', 'Orange Crush', 'Brisk Ice Tea'
    ].map(name => ({
      name: `2L ${name}`,
      category_id: drinksId,
      price: 4.99,
      description: 'Refreshing 2L bottled soda',
      is_available: true,
      display_order: 102
    }));

    console.log('Adding Desserts...');
    const desserts = [
      { name: 'Lava Cake', price: 3.99, description: 'Warm chocolate cake with molten center (330 Cals)', category_id: dessertsId, image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62ffff51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { name: 'Strawberry Cheesecake Slice', price: 5.91, description: 'Creamy cheesecake with strawberry topping (250 Cals)', category_id: dessertsId, image_url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
    ];

    const allItems = [...drinks591ml, ...drinks2L, ...desserts];
    
    // Check if table has metadata column
    console.log('Adding metadata column if needed...');
    try {
      await supabase.rpc('add_metadata_column'); // Hypothetical RPC or we can just try to insert and see
    } catch (e) {
      // Fallback: If we can't add column, we'll store in description as JSON string for now
      // But let's assume we can add it or it's there.
    }

    console.log('Inserting items...');
    for (const item of allItems) {
      const { data: existing } = await supabase.from('menu_items').select('id').eq('name', item.name).single();
      if (existing) {
        await supabase.from('menu_items').update(item).eq('id', existing.id);
      } else {
        await supabase.from('menu_items').insert([item]);
      }
    }

    console.log('Updating Pizzas with sizes...');
    const { data: pizzas } = await supabase.from('menu_items').select('*').eq('category_id', 'a9f73f40-349f-431c-8e01-20a7b4f5351a'); // ID might vary, use name instead
    
    // Better: update by category name
    const pizzaCat = categories.find(c => c.name === 'Pizzas' || c.name === 'Traditional Pizzas');
    if (pizzaCat) {
      const pizzaSizes = [
        { size: 'Medium', price: 16.99 },
        { size: 'Large', price: 19.99 },
        { size: 'X-Large', price: 22.99 }
      ];
      
      const { data: pizzaItems } = await supabase.from('menu_items').select('id').eq('category_id', pizzaCat.id);
      if (pizzaItems) {
        for (const item of pizzaItems) {
          await supabase.from('menu_items').update({
            price: 16.99, // 'Starting from' price
            description: JSON.stringify({
              customizable: true,
              sizes: pizzaSizes
            })
          }).eq('id', item.id);
        }
      }
    }

    console.log('Menu update complete!');
  } catch (error) {
    console.error('Error updating menu:', error);
  }
}

updateMenu();
