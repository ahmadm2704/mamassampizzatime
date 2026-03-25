const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) acc[key.trim()] = rest.join('=').trim().replace(/^['`"]|['`"]$/g, '');
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const items = [
    { name: 'Wings Combo', category: 'Chicken Menu', description: '10 Classic Wings + Small Fries + 591ml Pop', price: 18.99, image_url: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800' },
    { name: 'Indian Style Wings', category: 'Chicken Menu', description: 'Seasoned with hot sauce, caesar, onions, ginger, green chili & coriander', price: 14.99, image_url: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Chicken Strips (6 pcs)', category: 'Chicken Menu', description: 'Boneless strips of chicken breast', price: 12.99, image_url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800' },
    { name: 'Boneless Wings (10 pcs)', category: 'Chicken Menu', description: 'Crispy battered boneless wings', price: 13.99, image_url: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Spicy Veggie Deluxe', category: 'Pizzas', description: 'Single Medium Pizza with Green peppers, Onions, Tomatoes & Hot Peppers', price: 16.99, image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800' },
    { name: 'Garden Veggie Pizza', category: 'Pizzas', description: 'Single Medium Pizza with Green Peppers, Onions, Tomatoes & Green Olives', price: 16.99, image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
    { name: 'Butter Chicken Pizza', category: 'Pizzas', description: 'Single Medium Pizza with Butter Chicken, Green Peppers, Onions & Roasted Red Peppers', price: 16.99, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tandoori Chicken Pizza', category: 'Pizzas', description: 'Single Medium Pizza with Tandoori Chicken, Green Peppers, Onions & Roasted Red Peppers', price: 16.99, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800' },
    { name: 'Potato Wedges', category: 'Perfect Sides', description: 'Perfect crispy potato wedges', price: 6.99, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800' },
    { name: 'Crispy Sandwiches', category: 'Sandwiches', description: 'Freshly made sandwich with chicken breast', price: 9.99, image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800' },
    { name: 'Soda Assortment', category: 'Drinks', description: 'Assorted beverages and sodas', price: 2.99, image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800' },
    { name: 'Chocolate Lava Cake', category: 'Desserts', description: 'Warm chocolate cake with molten center', price: 7.99, image_url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800' }
  ];

  // Map to distinct categories
  const categoriesToCreate = [...new Set(items.map(i => i.category))];
  
  for (const catName of categoriesToCreate) {
    let { data: catData } = await supabase.from('categories').select('id').eq('name', catName).single();
    if (!catData) {
      const { data: newCat } = await supabase.from('categories').insert({ name: catName, description: 'Explore ' + catName, is_active: true }).select('id').single();
      catData = newCat;
    }
    
    // Now insert items
    const catItems = items.filter(i => i.category === catName);
    for (const item of catItems) {
      const { data: existing } = await supabase.from('menu_items').select('id').eq('name', item.name).maybeSingle();
      if (!existing) {
        await supabase.from('menu_items').insert({
          category_id: catData.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image_url: item.image_url,
          is_available: true
        });
        console.log('Inserted: ' + item.name);
      } else {
        // Update image if it exists
        await supabase.from('menu_items').update({ image_url: item.image_url }).eq('id', existing.id);
        console.log('Updated: ' + item.name);
      }
    }
  }
  console.log('Seeding done.');
}
run();