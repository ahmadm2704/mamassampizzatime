'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p>
                At Mama Sam Pizza, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Billing information</li>
                <li>Order history and preferences</li>
                <li>Device information and usage data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Use of Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Process your transactions</li>
                <li>Send you promotional communications</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at privacy@mamasam.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
