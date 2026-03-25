const fs = require('fs');
let code = fs.readFileSync('D:/Websites/MAMASSAMPIZZATIME/app/admin/gallery/page.tsx', 'utf8');

if(!code.includes('uploadImage')) {
  code = code.replace(/import \{ FormModal \} from '@\/components\/form-modal';/, `import { FormModal } from '@/components/form-modal';\nimport { uploadImage } from '@/lib/supabase-storage';\nimport { Image as ImageIcon, Upload } from 'lucide-react';`);
  
  code = code.replace(/const \[formData, setFormData\] = useState<any>\(\{\}\);/, `const [formData, setFormData] = useState<any>({});\n  const [uploading, setUploading] = useState(false);`);

  code = code.replace(/<div>\s*<label className=\"block text-sm font-medium mb-1\">Image URL<\/label>\s*<Input\s*type=\"text\"\s*value=\{formData\['image_url'\] \|\| ''\}\s*onChange=\{e => setFormData\(\{ ...formData, 'image_url': e.target.value \}\)\}\s*\/>\s*<\/div>/, `
          <div>
            <label className="block text-sm font-medium mb-1">Image source (URL or Upload)</label>
            <div className="flex gap-2 mb-2">
              <Input 
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData['image_url'] || ''}
                onChange={e => setFormData({ ...formData, 'image_url': e.target.value })}
              />
            </div>
            <div className="relative border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted transition-colors">
              {uploading ? (
                 <div className="text-sm text-muted-foreground flex items-center gap-2">
                   <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                   Uploading...
                 </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground mb-1">Or click to upload from computer</span>
                  <span className="text-xs text-muted-foreground/70">JPG, PNG, WEBP max 5MB</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          setUploading(true);
                          const url = await uploadImage(e.target.files[0], 'gallery');
                          if (url) {
                            setFormData({ ...formData, 'image_url': url });
                          }
                        } catch (err) {
                          alert('Failed to upload image. Please ensure you have created a public Storage Bucket in Supabase named "gallery"');
                        } finally {
                          setUploading(false);
                        }
                      }
                    }}
                  />
                </>
              )}
            </div>
            {formData['image_url'] && (
               <div className="mt-4 rounded-lg overflow-hidden border border-border h-40 bg-zinc-100 flex items-center justify-center relative">
                 <img src={formData['image_url']} alt="Preview" className="max-h-full object-contain" />
               </div>
            )}
          </div>
`);
  
  fs.writeFileSync('D:/Websites/MAMASSAMPIZZATIME/app/admin/gallery/page.tsx', code);
  console.log('Modified gallery page for uploads');
}
