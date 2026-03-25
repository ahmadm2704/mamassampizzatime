const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const parts = line.split('=');
  if (parts.length > 1) {
    const key = parts[0].trim();
    acc[key] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data: menuItems, error: fetchError } = await supabase.from('menu_items').select('id, name, image_url');
  
  if (fetchError) {
     console.error('fetch error', fetchError);
  }
  console.log('Items length:', menuItems ? menuItems.length : 0);
  if (menuItems && menuItems.length > 0) {
      console.log('Sample item:', menuItems[0]);
  }
}
run();
