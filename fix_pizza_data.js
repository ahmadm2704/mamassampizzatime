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

const pizzaDescriptions = {
  'Canadian Pizza': 'A classic Canadian favorite topped with savory pepperoni, fresh mushrooms, and crispy bacon.',
  'Meat Lovers Pizza': 'The ultimate feast for meat lovers! Loaded with pepperoni, ham, bacon, ground beef, and Italian sausage.',
  'Signature Chicken Corn': 'Our chef\'s special: tender chicken pieces, sweet corn, fresh green peppers, and onions on our signature sauce.',
  'Hawaiian Pizza': 'A tropical delight featuring ham and sweet pineapple chunks.',
  'Vegetarian Pizza': 'Fresh garden favorites: green peppers, mushrooms, onions, and diced tomatoes.',
  'Greek Pizza': 'A Mediterranean masterpiece with black olives, sliced tomatoes, onions, and feta cheese.',
  'Butter Chicken Pizza': 'Experience the rich flavors of India with creamy butter chicken sauce, tandoori chicken, and red onions.',
  'Pepperoni Pizza': 'Double the pepperoni, double the flavor! A timeless classic.',
  'Cheese Pizza': 'A simple yet delicious blend of our finest mozzarella and parmesan cheeses.'
};

async function fixData() {
  try {
    console.log('Fetching all menu items...');
    const { data: items, error } = await supabase.from('menu_items').select('*');
    if (error) throw error;

    for (const item of items) {
      let metadata = item.metadata || {};
      let description = item.description;

      // Check if description is actually a JSON string
      if (description && description.startsWith('{')) {
        try {
          const parsed = JSON.parse(description);
          metadata = { ...metadata, ...parsed };
          // Reset description to something proper or use lookup
          description = pizzaDescriptions[item.name] || 'Delicious fresh pizza made with premium ingredients.';
          console.log(`Fixed metadata for ${item.name}`);
        } catch (e) {
          // Not JSON, skip
        }
      }

      // Even if not JSON, if it's a pizza, ensure it has sizes and a good description
      const isPizza = item.category === 'Traditional Pizzas' || 
                      item.category === 'Gourmet Pizzas' || 
                      item.name.toLowerCase().includes('pizza') ||
                      item.category === 'a9f73f40-349f-431c-8e01-20a7b4f5351a'; // Known pizza cat ID
      
      if (isPizza) {
        if (!metadata.sizes) {
          metadata.sizes = [
            { size: 'Medium', price: 16.99 },
            { size: 'Large', price: 19.99 },
            { size: 'X-Large', price: 22.99 }
          ];
        }
        metadata.customizable = true;
        const realDescription = pizzaDescriptions[item.name] || 'Delicious fresh pizza made with premium ingredients.';
        metadata.real_description = realDescription;
        
        description = `JSON_METADATA:${JSON.stringify(metadata)}`;
        console.log(`Updated ${item.name} with synthetic metadata`);
      }

      await supabase.from('menu_items')
        .update({ description })
        .eq('id', item.id);
    }

    console.log('Fix complete!');
  } catch (err) {
    console.error(err);
  }
}

fixData();
