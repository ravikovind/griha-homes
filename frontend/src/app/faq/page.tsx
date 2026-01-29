'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is GrihaHomes?',
        a: 'GrihaHomes is a property listing platform that connects property seekers with owners in India. You can search for properties to rent or buy, and list your property for others to find.',
      },
      {
        q: 'Is GrihaHomes free to use?',
        a: 'Yes, basic features like searching properties and creating inquiries are completely free. Property owners can list up to 10 properties for free. Premium features may be available in the future.',
      },
      {
        q: 'Which cities does GrihaHomes cover?',
        a: "We currently operate in 50+ cities across India, including Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, and more. We're expanding to new cities regularly.",
      },
    ],
  },
  {
    category: 'For Property Seekers',
    questions: [
      {
        q: 'How do I search for properties?',
        a: 'Use our search bar on the homepage to enter a city, locality, or landmark. You can filter results by property type, price range, number of rooms, and more.',
      },
      {
        q: 'How do I contact a property owner?',
        a: "Once you find a property you're interested in, click on 'Send Inquiry' to send a message to the owner. You'll need to create a free account to do this.",
      },
      {
        q: 'Are the listings verified?',
        a: 'We verify all listings to the best of our ability. However, we recommend visiting the property in person and verifying documents before making any commitments.',
      },
    ],
  },
  {
    category: 'For Property Owners',
    questions: [
      {
        q: 'How do I list my property?',
        a: "Create an account, go to your dashboard, and click 'Add Property'. Fill in the details, upload photos, and submit. Your listing will be live after a quick review.",
      },
      {
        q: 'How many properties can I list?',
        a: 'You can list up to 10 properties per account. Each property listing is valid for 90 days and can be renewed.',
      },
      {
        q: 'How do I receive inquiries?',
        a: "When someone is interested in your property, you'll receive an inquiry via email and in your dashboard. You can respond directly to the interested party.",
      },
    ],
  },
  {
    category: 'Account & Security',
    questions: [
      {
        q: 'How do I create an account?',
        a: "Click 'Get Started' and enter your phone number. You'll receive an OTP to verify your number. After verification, set up your password and you're ready to go.",
      },
      {
        q: 'I forgot my password. How do I reset it?',
        a: "Click 'Forgot Password' on the login page, enter your phone number, and verify with OTP. You'll then be able to set a new password.",
      },
      {
        q: 'Is my data safe with GrihaHomes?',
        a: 'Yes, we use industry-standard encryption and security practices to protect your data. Read our Privacy Policy for more details.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
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
                <HelpCircle className="h-12 w-12 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about GrihaHomes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {faqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden px-6">
                    {category.questions.map((faq) => (
                      <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Still have questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Contact Support
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
