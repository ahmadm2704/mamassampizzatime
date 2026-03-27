const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#\s][^=]*)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ─── IMAGE MAP  ───────────────────────────────────────────────────────────────
// Maps item name keywords → a beautiful Unsplash food photo URL
// Unsplash source URLs auto-serve high-quality images with no auth needed.
const IMAGE_MAP = [
  // ── PIZZAS ──
  { keywords: ['canadian'], img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['meat lover', 'meat feast', 'meaty'], img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['meatball'], img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['greek', 'feta', 'mediterranean'], img: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['hawaiian', 'pineapple'], img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['buffalo', 'hot sauce', 'frank'], img: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['veggie', 'vegetarian', 'garden', 'all veg'], img: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['bbq', 'barbecue', 'smoky'], img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['pepperoni'], img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['cheese', 'cheesy', 'four cheese', 'triple cheese'], img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['mushroom'], img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['tex mex', 'taco', 'mexican', 'mango', 'chif'], img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['chicken', 'butter chicken', 'tikka', 'tandoori'], img: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['greek pizza', 'odyssey'], img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['health', 'veggie supreme', 'spinach'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['signature', 'deal', 'special', 'combo', 'feast', 'student', 'classic combo', 'mega', 'double', 'pick up', 'pickup'], img: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['build your own', 'custom'], img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80&auto=format&fit=crop' },

  // ── CHICKEN ──
  { keywords: ['wing', 'wings'], img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['strip', 'strips', 'tenders'], img: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['boneless'], img: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['indian style', 'desi'], img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80&auto=format&fit=crop' },

  // ── SIDES ──
  { keywords: ['loaded fries', 'loaded'], img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['seasoned fries', 'garlic fries'], img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['fries', 'french fries', 'poutine'], img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['wedges', 'potato wedge'], img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3f?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['onion ring', 'onion rings'], img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['garlic bread', 'breadstick', 'bread'], img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['dip', 'sauce', 'dipping'], img: 'https://images.unsplash.com/photo-1607829491732-f3a5f8ae14e1?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['salad', 'caesar', 'green'], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['pasta', 'penne', 'spaghetti', 'alfredo'], img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['sandwich', 'sub', 'panini', 'wrap', 'burger'], img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['square pizza'], img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80&auto=format&fit=crop' },

  // ── DRINKS ──
  { keywords: ['pepsi', 'cola', 'diet pepsi'], img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['7 up', '7up', 'sprite', 'ginger ale', 'mountain dew'], img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['orange crush', 'crush', 'grape', 'cream soda', 'root beer', 'dr pepper', 'brisk', 'lemonade'], img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['water', 'bottle water'], img: 'https://images.unsplash.com/photo-1523362628242-f9c3bf9eeeb2?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['2l', '2 l pop', '2l pop'], img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80&auto=format&fit=crop' },

  // ── DESSERTS ──
  { keywords: ['lava cake', 'chocolate', 'brownie'], img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['cheesecake', 'strawberry cheesecake'], img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['donut', 'doughnut'], img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['cake', 'slice'], img: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['ice cream', 'gelato', 'sundae'], img: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['cookie', 'cookies'], img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80&auto=format&fit=crop' },
  { keywords: ['tiramisu'], img: 'https://images.unsplash.com/photo-1586040051374-4e5a0d54dc9c?w=800&q=80&auto=format&fit=crop' },
];

// Default fallback
const PIZZA_FALLBACK = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80&auto=format&fit=crop';

function findImage(name) {
  const lower = name.toLowerCase();
  for (const entry of IMAGE_MAP) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.img;
    }
  }
  return PIZZA_FALLBACK;
}

async function addImages() {
  console.log('Fetching all menu items...');
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('id, name, image_url, category_id');

  if (error) { console.error(error); return; }
  console.log(`Found ${items.length} items.`);

  let updated = 0;
  let skipped = 0;

  for (const item of items) {
    // Skip items that already have a real image
    if (item.image_url && item.image_url.startsWith('http') && !item.image_url.includes('placeholder')) {
      // Still update it to ensure it's the best match image
    }

    const img = findImage(item.name);
    const { error: updateErr } = await supabase
      .from('menu_items')
      .update({ image_url: img })
      .eq('id', item.id);

    if (updateErr) {
      console.error(`❌ Failed to update "${item.name}":`, updateErr.message);
    } else {
      console.log(`✅ "${item.name}" → image set`);
      updated++;
    }
  }

  console.log(`\n🎉 Done! Updated ${updated} items.`);
}

addImages();
