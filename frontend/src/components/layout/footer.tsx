import Link from "next/link";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms-and-conditions", label: "Terms of Service" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ],
  properties: [
    { href: "/properties?for=rent", label: "Rent" },
    { href: "/properties?for=sale", label: "Buy" },
    { href: "/properties?type=flat", label: "Flats" },
    { href: "/properties?type=house", label: "Houses" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GrihaHomes</span>
            </Link>
            <p className="text-sm text-slate-400">
              Find your perfect home in India. We connect property seekers with
              owners for rent and sale.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@grihahomes.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Properties</h3>
            <ul className="space-y-2">
              {footerLinks.properties.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} GrihaHomes. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
