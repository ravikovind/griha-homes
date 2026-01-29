'use client';

import { LegalPageLayout } from '@/components/layout/legal-page-layout';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'description', title: 'Description of Service' },
  { id: 'account', title: 'User Accounts' },
  { id: 'listings', title: 'Property Listings' },
  { id: 'prohibited', title: 'Prohibited Activities' },
  { id: 'fees', title: 'Fees and Payments' },
  { id: 'limitation', title: 'Limitation of Liability' },
  { id: 'intellectual', title: 'Intellectual Property' },
  { id: 'termination', title: 'Termination' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Information' },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="2026-01-27"
      sections={sections}
    >
      {/* Acceptance of Terms */}
      <section id="acceptance" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Welcome to GrihaHomes. By accessing or using our property listing platform
            (&quot;Services&quot;), you agree to be bound by these Terms and Conditions
            (&quot;Terms&quot;). Please read these Terms carefully before using our Services.
          </p>
          <p>
            If you do not agree to these Terms, you may not access or use the Services. Your
            continued use of the Services constitutes acceptance of these Terms and any future
            modifications.
          </p>
          <div className="p-4 bg-muted/30 border border-border rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Legal Agreement:</strong> These Terms constitute
              a legally binding agreement between you and GrihaHomes. By creating an account, you
              confirm that you are at least 18 years old and have the legal capacity to enter
              into this agreement.
            </p>
          </div>
        </div>
      </section>

      {/* Description of Service */}
      <section id="description" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Description of Service</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            GrihaHomes is a property listing platform that provides:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Property listing and search functionality</li>
            <li>Direct communication between property seekers and owners</li>
            <li>Location-based property search using geo-coordinates</li>
            <li>Property inquiry and contact management</li>
            <li>Image upload and gallery features for properties</li>
          </ul>

          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Service Limitations</h3>
            <p>
              GrihaHomes is a platform that connects users. We do not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Own, manage, or guarantee any properties listed</li>
              <li>Verify the accuracy of all listing information</li>
              <li>Provide legal or financial advice</li>
              <li>Mediate disputes between users</li>
            </ul>
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Important:</strong> All property transactions
              are between users. We recommend verifying property details and conducting due
              diligence before any commitments.
            </p>
          </div>
        </div>
      </section>

      {/* User Accounts */}
      <section id="account" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">User Accounts</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground mb-3">Account Creation</h3>
          <p>
            To use certain features of our service, you must create an account by providing:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>A valid phone number (verified via OTP)</li>
            <li>A secure password</li>
            <li>Optional: Name and email address</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Account Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>Providing accurate and up-to-date information</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Account Termination</h3>
          <p>
            We reserve the right to suspend or terminate your account if you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Violate these Terms or our policies</li>
            <li>Engage in fraudulent or illegal activities</li>
            <li>Post fake or misleading listings</li>
            <li>Harass or abuse other users</li>
          </ul>
        </div>
      </section>

      {/* Property Listings */}
      <section id="listings" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Property Listings</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground mb-3">Listing Requirements</h3>
          <p>Property owners who list on GrihaHomes agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide accurate and truthful information about their property</li>
            <li>Upload only genuine photos of the property</li>
            <li>Keep listing information up to date</li>
            <li>Respond to inquiries in a timely manner</li>
            <li>Not discriminate against potential tenants/buyers</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Listing Limits</h3>
          <div className="p-4 bg-muted/30 border border-border rounded-lg">
            <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
              <li>Maximum 10 properties per owner account</li>
              <li>Maximum 10 images per property listing</li>
              <li>Listings expire after 90 days and can be renewed</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Content Ownership</h3>
          <p>
            By uploading content (photos, descriptions) to GrihaHomes, you grant us a
            non-exclusive license to display and distribute that content on our platform
            for the purpose of providing our services.
          </p>
        </div>
      </section>

      {/* Prohibited Activities */}
      <section id="prohibited" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Activities</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>You are strictly prohibited from:</p>

          <ul className="list-disc list-inside space-y-3 ml-4">
            <li>
              <strong className="text-foreground">False Information:</strong> Posting false,
              misleading, or fraudulent property listings
            </li>
            <li>
              <strong className="text-foreground">Impersonation:</strong> Impersonating another
              person, entity, or property owner
            </li>
            <li>
              <strong className="text-foreground">Harassment:</strong> Harassing, threatening,
              or abusing other users
            </li>
            <li>
              <strong className="text-foreground">Illegal Activities:</strong> Using the platform
              for illegal activities or money laundering
            </li>
            <li>
              <strong className="text-foreground">Security Violations:</strong> Attempting to
              access restricted areas or compromise platform security
            </li>
            <li>
              <strong className="text-foreground">Data Scraping:</strong> Using automated tools
              to collect data without authorization
            </li>
            <li>
              <strong className="text-foreground">Spam:</strong> Sending unsolicited messages
              or promotional content
            </li>
          </ul>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Violation Consequences:</strong> Engaging in
              prohibited activities may result in immediate account termination and may be
              reported to relevant authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Fees and Payments */}
      <section id="fees" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Fees and Payments</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground mb-3">Free Services</h3>
          <p>
            Basic property listing on GrihaHomes is currently free, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Creating and managing property listings</li>
            <li>Searching and browsing properties</li>
            <li>Sending and receiving inquiries</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Future Premium Features</h3>
          <p>
            Premium features may be available for a fee in the future. Any changes to
            pricing will be communicated in advance.
          </p>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section id="limitation" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            To the fullest extent permitted by law, GrihaHomes shall not be liable for:
          </p>

          <ul className="list-disc list-inside space-y-3 ml-4">
            <li>
              <strong className="text-foreground">Property Issues:</strong> The accuracy,
              condition, or legality of listed properties
            </li>
            <li>
              <strong className="text-foreground">User Conduct:</strong> The conduct of users
              on the platform or in transactions
            </li>
            <li>
              <strong className="text-foreground">Disputes:</strong> Any disputes between
              users regarding properties or transactions
            </li>
            <li>
              <strong className="text-foreground">Financial Loss:</strong> Any financial loss
              arising from use of our services
            </li>
            <li>
              <strong className="text-foreground">Service Interruptions:</strong> Downtime,
              technical issues, or data loss
            </li>
          </ul>

          <div className="p-4 bg-muted/30 border border-border rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">&quot;As-Is&quot; Service:</strong> The Services are
              provided &quot;as-is&quot; and &quot;as available&quot; without warranties of any kind.
            </p>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section id="intellectual" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground mb-3">Our Rights</h3>
          <p>
            All content, features, and functionality of the Services are owned by GrihaHomes
            and protected by intellectual property laws. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Platform design, logos, and branding</li>
            <li>Software code and architecture</li>
            <li>User interface and experience designs</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Your License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to access and use
            the Services for personal, non-commercial purposes only, subject to these Terms.
          </p>
        </div>
      </section>

      {/* Termination */}
      <section id="termination" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms
            or for any other reason at our discretion.
          </p>
          <p>
            You may also delete your account at any time through your account settings.
            Upon termination:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your listings will be removed from the platform</li>
            <li>Your data will be handled according to our Privacy Policy</li>
            <li>Any pending inquiries will be cancelled</li>
          </ul>
        </div>
      </section>

      {/* Changes to Terms */}
      <section id="changes" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We may update these Terms from time to time. We will notify you of material changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Updating the &quot;Last updated&quot; date at the top of this page</li>
            <li>Sending an email notification (if you have provided an email address)</li>
            <li>Displaying a notice on the platform</li>
          </ul>

          <p className="mt-4">
            Your continued use of the Services after changes are posted constitutes acceptance
            of the updated Terms. If you do not agree, you must discontinue using the Services.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            If you have any questions about these Terms, please contact us:
          </p>

          <div className="p-6 bg-muted/30 border border-border rounded-lg space-y-3 mt-6">
            <div>
              <strong className="text-foreground">Email:</strong>{' '}
              <a href="mailto:legal@grihahomes.com" className="text-primary hover:underline">
                legal@grihahomes.com
              </a>
            </div>
            <div>
              <strong className="text-foreground">Response Time:</strong> We aim to respond
              within 24-48 hours
            </div>
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Effective Date:</strong> These Terms are
              effective as of the &quot;Last updated&quot; date shown at the top of this page.
            </p>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
