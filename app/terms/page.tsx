'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on our site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer</h2>
              <p>
                The materials on Mama Sam Pizza's website are provided on an 'as is' basis. Mama Sam Pizza makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitations</h2>
              <p>
                In no event shall Mama Sam Pizza or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at legal@mamasam.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
