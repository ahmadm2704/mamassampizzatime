'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { faqs } from '@/lib/mock-data';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const groupedFaqs = faqs.reduce(
    (acc, faq) => {
      const category = faq.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(faq);
      return acc;
    },
    {} as Record<string, typeof faqs>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">
            Find answers to common questions about Mama Sam Pizza
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>

              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-card rounded-lg border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                    >
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                          openId === faq.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openId === faq.id && (
                      <div className="px-6 py-4 border-t border-border bg-muted/30">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Didn't find your answer?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us directly and we'll be happy to help!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
