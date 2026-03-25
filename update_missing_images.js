const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) acc[key.trim()] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const mappings = {
  'Margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
  'Pasta Carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
  'Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
  'Soft Drinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
  'Pepperoni': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
  'Panna Cotta': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800'
};

const defaultImages = {
  'Pizzas': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
  'Italian Pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800',
  'Desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
  'Drinks': 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
  'Sides': 'https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&q=80&w=800',
  'Chicken Menu': 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800',
};

async function run() {
  const { data: menuItems, error: fetchError } = await supabase.from('menu_items').select('id, name, category_id, image_url');
  if (fetchError) {
    console.error('Fetch error:', fetchError);
    return;
  }
  
  const { data: categories, error: catError } = await supabase.from('categories').select('id, name');

  for (const item of menuItems) {
    if (!item.image_url) {
      let cover = null;
      if (mappings[item.name]) {
        cover = mappings[item.name];
      } else {
        const cat = categories.find(c => c.id === item.category_id);
        if (cat && defaultImages[cat.name]) {
          cover = defaultImages[cat.name];
        } else {
          cover = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80';
        }
      }
      
      console.log(Updating \ with \);
      const { error: updateError } = await supabase.from('menu_items').update({ image_url: cover }).eq('id', item.id);
      if (updateError) {
        console.error(Failed to update \: \);
      }
    }
  }
  console.log('Update complete.');
}
run();
