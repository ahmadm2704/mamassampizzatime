'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Users } from 'lucide-react';
import { useCreateReservation } from '@/hooks/use-supabase';

export default function ReservationsPage() {
  const { createReservation, loading } = useCreateReservation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '2',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Combine date and time
      const reservationDate = new Date(`${formData.date}T${formData.time}:00`);
      
      await createReservation({
        guest_name: formData.name,
        guest_email: formData.email,
        guest_phone: formData.phone,
        party_size: parseInt(formData.partySize, 10),
        reservation_date: reservationDate.toISOString(),
        special_requests: formData.specialRequests,
        status: 'pending' as any
      });

      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          partySize: '2',
          specialRequests: '',
        });
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Failed to submit reservation:', err);
      // In a real app we'd show a toast error here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Make a Reservation</h1>
          <p className="text-xl opacity-90">
            Reserve your table and enjoy a memorable dining experience at Mama Sam
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Reservation Confirmed!</h3>
                <p className="text-muted-foreground mb-2">
                  Thank you for your reservation
                </p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Reservation Details</h2>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Personal Information</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Phone *</label>
                    <Input
                      placeholder="(905) 545-8899"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">When Would You Like to Dine?</h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4" />
                        Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4" />
                        Time *
                      </label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4" />
                        Party Size *
                      </label>
                      <select
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Special Requests</h3>

                  <div>
                    <label className="text-sm font-medium text-foreground">Any special occasion or requests?</label>
                    <textarea
                      placeholder="Birthday celebration, dietary restrictions, etc."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  {loading ? 'Submitting...' : 'Confirm Reservation'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll confirm your reservation and may contact you if needed.
                </p>
              </form>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-muted rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Reservation Policies</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Reservations are available for parties of 2 to 20 guests</li>
              <li>• We ask for a 24-hour cancellation notice</li>
              <li>• Tables are reserved for 2 hours</li>
              <li>• Call us at (905) 545-8899 for special requests</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
