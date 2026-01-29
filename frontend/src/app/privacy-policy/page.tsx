'use client';

import { LegalPageLayout } from '@/components/layout/legal-page-layout';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'data-security', title: 'Data Storage and Security' },
  { id: 'cookies', title: 'Cookies and Tracking' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'your-rights', title: 'Your Privacy Rights' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="2026-01-27"
      sections={sections}
    >
      {/* Introduction */}
      <section id="introduction" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Welcome to GrihaHomes. We are committed to protecting your personal information and
            your right to privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our property listing platform.
          </p>
          <p>
            By using GrihaHomes, you agree to the collection and use of information in accordance
            with this policy. If you do not agree with our policies and practices, please do
            not use our services.
          </p>
          <p>
            This policy applies to all information collected through our website, mobile
            application, and any related services (collectively, the &quot;Services&quot;).
          </p>
        </div>
      </section>

      {/* Information We Collect */}
      <section id="information-we-collect" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
            <p className="mb-3">
              We collect personal information that you voluntarily provide to us when you
              register on the platform, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and contact information (phone number, email)</li>
              <li>Account credentials (encrypted password)</li>
              <li>Profile information (photo, preferences)</li>
              <li>Property listings (photos, descriptions, location)</li>
              <li>Communication with other users</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Usage Data</h3>
            <p className="mb-3">
              We automatically collect certain information when you use GrihaHomes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device information (browser, OS, device type)</li>
              <li>IP address and approximate location</li>
              <li>Usage patterns (pages visited, search queries)</li>
              <li>Property viewing history and saved listings</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Location Data</h3>
            <p>
              With your permission, we collect location data to provide location-based property
              search and to display properties near you. You can disable location access
              through your device settings.
            </p>
          </div>
        </div>
      </section>

      {/* How We Use Your Information */}
      <section id="how-we-use" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-foreground">Service Delivery:</strong> To provide property
              listing, search, and inquiry services
            </li>
            <li>
              <strong className="text-foreground">Authentication:</strong> To verify user
              identity via OTP and manage secure sessions
            </li>
            <li>
              <strong className="text-foreground">Communication:</strong> To facilitate
              communication between property seekers and owners
            </li>
            <li>
              <strong className="text-foreground">Personalization:</strong> To customize your
              experience and provide relevant property recommendations
            </li>
            <li>
              <strong className="text-foreground">Security:</strong> To detect and prevent
              fraud, spam, and unauthorized access
            </li>
            <li>
              <strong className="text-foreground">Legal Compliance:</strong> To comply with
              applicable laws and regulations
            </li>
          </ul>
        </div>
      </section>

      {/* Data Security */}
      <section id="data-security" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Data Storage and Security</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We implement industry-standard security measures to protect your personal
            information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-foreground">Encryption:</strong> All sensitive data is
              encrypted in transit (HTTPS) and at rest
            </li>
            <li>
              <strong className="text-foreground">Authentication:</strong> JWT-based
              authentication with secure token management
            </li>
            <li>
              <strong className="text-foreground">Password Hashing:</strong> Bcrypt password
              hashing with industry-standard salt rounds
            </li>
            <li>
              <strong className="text-foreground">Access Controls:</strong> Role-based access
              controls and audit logging
            </li>
          </ul>
          <div className="p-4 bg-muted/30 border border-border rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Important Notice:</strong> While we implement
              robust security measures, no method of transmission over the Internet is 100%
              secure. We cannot guarantee absolute security but continuously work to protect
              your data.
            </p>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section id="cookies" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We use cookies and similar technologies to enhance your experience and analyze
            platform usage.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">What We Store</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Authentication tokens (for session management)</li>
            <li>User preferences (search filters, saved locations)</li>
            <li>Analytics data (anonymized usage patterns)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Your Control</h3>
          <p>
            You can control cookies through your browser settings. Note that disabling cookies
            may affect some features of the platform.
          </p>
        </div>
      </section>

      {/* Third-Party Services */}
      <section id="third-party" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            GrihaHomes integrates with the following third-party services:
          </p>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Firebase</h3>
              <p>
                We use Firebase for OTP verification and authentication services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Cloudinary</h3>
              <p>
                Property images are stored and served through Cloudinary for optimal
                delivery and performance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Maps Services</h3>
              <p>
                We use mapping services to display property locations and enable
                location-based search.
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 border border-border rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">Data Sharing:</strong> We do not sell, trade,
              or rent your personal information to third parties.
            </p>
          </div>
        </div>
      </section>

      {/* Your Privacy Rights */}
      <section id="your-rights" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Rights</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>You have the following rights regarding your personal information:</p>

          <ul className="list-disc list-inside space-y-3 ml-4">
            <li>
              <strong className="text-foreground">Access:</strong> Request a copy of your
              personal data we hold
            </li>
            <li>
              <strong className="text-foreground">Correction:</strong> Request correction of
              inaccurate or incomplete data
            </li>
            <li>
              <strong className="text-foreground">Deletion:</strong> Request deletion of your
              account and associated data
            </li>
            <li>
              <strong className="text-foreground">Portability:</strong> Receive your data in a
              machine-readable format
            </li>
            <li>
              <strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing
              communications
            </li>
          </ul>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-6">
            <p className="text-sm">
              <strong className="text-foreground">How to Exercise Your Rights:</strong> To
              exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@grihahomes.com" className="text-primary hover:underline">
                privacy@grihahomes.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* Changes to This Policy */}
      <section id="changes" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any
            material changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Posting the new Privacy Policy on this page</li>
            <li>Updating the &quot;Last updated&quot; date at the top</li>
            <li>Sending an email notification (if you have provided an email address)</li>
          </ul>

          <p className="mt-4">
            We encourage you to review this Privacy Policy periodically. Your continued use of
            the Services after changes are posted constitutes acceptance of the updated policy.
          </p>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="scroll-mt-24 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>

          <div className="p-6 bg-muted/30 border border-border rounded-lg space-y-3 mt-6">
            <div>
              <strong className="text-foreground">Email:</strong>{' '}
              <a href="mailto:privacy@grihahomes.com" className="text-primary hover:underline">
                privacy@grihahomes.com
              </a>
            </div>
            <div>
              <strong className="text-foreground">Response Time:</strong> We aim to respond
              within 24-48 hours
            </div>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
