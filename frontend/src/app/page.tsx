'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Home,
  Building2,
  MapPin,
  Shield,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroBackground } from '@/components/three/hero-background';

const propertyTypes = [
  { icon: Home, label: 'Flats', count: '2,500+', href: '/properties?type=flat' },
  { icon: Building2, label: 'Houses', count: '1,200+', href: '/properties?type=house' },
  { icon: Building2, label: 'Villas', count: '800+', href: '/properties?type=villa' },
  { icon: Building2, label: 'Commercial', count: '500+', href: '/properties?type=commercial' },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are verified by our team to ensure authenticity and trust.',
  },
  {
    icon: MapPin,
    title: 'Location Search',
    description: 'Find properties near you with our geo-powered location search.',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Get responses from property owners within 24 hours.',
  },
  {
    icon: Users,
    title: 'Direct Connect',
    description: 'Connect directly with owners. No brokers, no commission.',
  },
];

const cities = [
  { name: 'Mumbai', properties: 1200 },
  { name: 'Delhi', properties: 980 },
  { name: 'Bangalore', properties: 850 },
  { name: 'Pune', properties: 620 },
  { name: 'Hyderabad', properties: 540 },
  { name: 'Chennai', properties: 480 },
];

const stats = [
  { value: '5,000+', label: 'Properties' },
  { value: '2,000+', label: 'Happy Users' },
  { value: '50+', label: 'Cities' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* 3D Background */}
          <Suspense fallback={null}>
            <HeroBackground />
          </Suspense>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Find Your Perfect
                  <br />
                  <span className="text-primary">Home</span> in India
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
              >
                Browse verified properties for rent and sale. Connect directly
                with owners — no brokers, no hidden fees.
              </motion.p>

              {/* Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="bg-background border border-border rounded-xl p-3 max-w-2xl"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by city, locality..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="rent">Rent</option>
                      <option value="sale">Buy</option>
                    </select>
                    <Button className="px-5 rounded-lg">
                      <Search className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Search</span>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex gap-8 mt-10"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                Browse by Type
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg"
              >
                Find the property that fits your needs
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {propertyTypes.map((type, index) => (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={type.href}>
                    <div className="p-6 bg-background border border-border rounded-xl text-center hover:border-primary hover:shadow-lg transition-all duration-200 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <type.icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold mb-1">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.count}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left - Content */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Why Choose GrihaHomes?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-muted-foreground mb-8"
                >
                  We make property search simple, transparent, and broker-free.
                </motion.p>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right - Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-primary rounded-2xl p-8 text-primary-foreground"
              >
                <h3 className="text-2xl font-bold mb-6">Trusted by Thousands</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold">5K+</div>
                    <div className="text-sm opacity-80">Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold">2K+</div>
                    <div className="text-sm opacity-80">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold">50+</div>
                    <div className="text-sm opacity-80">Cities</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {['No brokerage fees', 'Verified listings only', 'Direct owner contact'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5" />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                Popular Cities
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg"
              >
                Explore properties in top Indian cities
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
              {cities.map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/properties?city=${city.name}`} className="block">
                    <div className="p-4 bg-background border border-border rounded-xl text-center hover:border-primary hover:shadow-md transition-all duration-200">
                      <h3 className="font-semibold">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">{city.properties}+</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Home?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join thousands who found their perfect home through GrihaHomes.
                Start your search today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/properties"
                  className="px-8 py-3.5 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center"
                >
                  Browse Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3.5 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  List Your Property
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
