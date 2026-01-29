'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset success state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-background via-background to-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 inline-block p-4 bg-primary/10 rounded-full border border-primary/30"
              >
                <MessageSquare className="h-12 w-12 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contact <span className="gradient-text">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We&apos;d love to hear from you. Send us a message and
                we&apos;ll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <Input
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Subject *</label>
                        <Input
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Message *</label>
                        <textarea
                          placeholder="Tell us how we can help..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Email */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-3">
                        For general inquiries and support
                      </p>
                      <a
                        href="mailto:hello@grihahomes.com"
                        className="text-primary hover:underline"
                      >
                        hello@grihahomes.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                  <h3 className="text-lg font-semibold mb-4">Response Time</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We typically respond to all inquiries within 24-48 hours during
                    business days. For urgent issues, please include
                    &quot;URGENT&quot; in your subject line.
                  </p>
                </div>

                {/* FAQ Link */}
                <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Before you reach out...
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our FAQ section for quick answers to common questions
                    about GrihaHomes and platform features.
                  </p>
                  <a
                    href="/faq"
                    className="inline-flex items-center text-primary hover:underline font-semibold"
                  >
                    View FAQ
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
