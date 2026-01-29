'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart, Award, TrendingUp, Users, Home } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision we make starts with how it impacts our users.',
  },
  {
    icon: Award,
    title: 'Trust & Transparency',
    description: 'We verify all listings and maintain honest communication.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Continuously improving to make property search effortless.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a trusted network of property seekers and owners.',
  },
];

const stats = [
  { value: '5,000+', label: 'Properties Listed' },
  { value: '2,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Cities Covered' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 inline-block p-4 bg-primary/10 rounded-full border border-primary/30"
              >
                <Home className="h-12 w-12 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="gradient-text">GrihaHomes</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We&apos;re on a mission to make finding your perfect home in India simple,
                transparent, and stress-free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section ref={ref} className="py-24 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8"
              >
                <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize property search in India by connecting seekers
                  directly with owners, eliminating middlemen, and ensuring
                  verified, trustworthy listings for everyone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8"
              >
                <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become India&apos;s most trusted property platform where
                  finding a home is as easy as browsing your favorite app —
                  transparent, quick, and delightful.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at GrihaHomes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-colors text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8"
              >
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    GrihaHomes was born out of frustration. Like many Indians, we
                    experienced the pain of house hunting — dealing with brokers, visiting
                    fake listings, and paying hefty commissions.
                  </p>
                  <p>
                    We decided to change this. GrihaHomes was built with one goal:
                    create a platform where property seekers can connect directly with
                    verified owners, see real photos, and make informed decisions.
                  </p>
                  <p>
                    Today, GrihaHomes serves thousands of users across 50+ cities in
                    India. But this is just the beginning. The vision is to make
                    GrihaHomes the go-to platform for anyone looking to rent or buy
                    property in India.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                Ready to Find Your Home?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of happy customers who found their perfect home through GrihaHomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/properties"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Browse Properties
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
