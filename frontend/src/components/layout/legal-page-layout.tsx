'use client';

import { motion } from 'framer-motion';
import { Header } from './header';
import { Footer } from './footer';

interface Section {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background via-background to-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-muted-foreground">
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
              {/* Table of Contents - Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="sticky top-24 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4 text-foreground">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.aside>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="min-w-0"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
