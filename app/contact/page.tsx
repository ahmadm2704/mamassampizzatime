'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useCreateContactMessage } from '@/hooks/use-supabase';

export default function ContactPage() {
  const { sendMessage, loading } = useCreateContactMessage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { phone, ...submitData } = formData;
      if (phone) {
        submitData.message = `Phone: ${phone}\n\n${submitData.message}`;
      }
      await sendMessage(submitData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90">
            Have questions? We'd love to hear from you. Contact us anytime!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <Phone className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Phone</h3>
              <a href="tel:+19055458899" className="text-muted-foreground hover:text-primary transition-colors">
                (905) 545-8899
              </a>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <Mail className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
              <a href="mailto:info@mamasam.com" className="text-muted-foreground hover:text-primary transition-colors">
                info@mamasam.com
              </a>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Locations</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Mama Sam Pizza Time</p>
                  <p>476 Beach Rd</p>
                  <p>Hamilton ON L8H 3K7</p>
                  <p>Canada</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Hours</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon - Thu</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat</span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Phone (optional)</label>
                    <Input
                      placeholder="(905) 545-8899"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <textarea
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={5}
                      required
                    />
                  </div>

                  <Button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
