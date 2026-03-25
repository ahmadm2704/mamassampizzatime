const fs = require('fs');
let code = fs.readFileSync('D:/Websites/MAMASSAMPIZZATIME/hooks/use-supabase.ts', 'utf8');

code = code.replace(/catch \(err\) \{\s*setError\(err instanceof Error \? err : new Error\('Unknown error'\)\);/g, `catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));`);

code = code.replace(/catch \(err\) \{\s*const error = err instanceof Error \? err : new Error\('Unknown error'\);\s*setError\(error\);\s*throw error;/g, `catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Unknown error');
      setError(error);
      throw error;`);

fs.writeFileSync('D:/Websites/MAMASSAMPIZZATIME/hooks/use-supabase.ts', code);
console.log('Fixed errors in use-supabase.ts');
