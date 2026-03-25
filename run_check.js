const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) acc[key.trim()] = rest.join('=').trim().replace(/^['`"]|['`"]$/g, '');
  return acc;
}, {});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('categories').select('*');
  console.log('Categories:', JSON.stringify(data, null, 2));

  // Check if we can alter table via a rest call, probably not
  // But we can check if it already has image_url
  if (data && data.length > 0 && !('image_url' in data[0])) {
    console.log('No image_url column. To add it, we might need a SQL extension or just run via REST if enabled.');
  }
}
run();