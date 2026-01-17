// privacy.jsx
import './privacy.css';

/**
 * Privacy Policy for Quick Medics Pharmacy
 * File: privacy.jsx
 */
export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>

      <p className="privacy-text">
        At <strong>Quick Medics Pharmacy</strong> ("we", "us", or "our"), your privacy is of utmost importance. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.
      </p>

      <h2 className="privacy-section-title">1. Information We Collect</h2>
      <ul className="privacy-list">
        <li>Name, email address, phone number, postal address when you register, place orders, or subscribe to updates.</li>
        <li>Payment card details or billing information collected via secure third-party processors.</li>
        <li>IP address, browser type, access times, pages viewed, referring website.</li>
        <li>Cookies and similar tracking technologies to enhance user experience.</li>
      </ul>

      <h2 className="privacy-section-title">2. How We Use Your Information</h2>
      <ul className="privacy-list">
        <li>To process and fulfill orders, manage your account, and send transactional communications.</li>
        <li>To personalize your experience and improve our website offerings.</li>
        <li>To send promotional messages, newsletters, and updates if you opt in.</li>
        <li>To detect, prevent, and address technical issues and security breaches.</li>
      </ul>

      <h2 className="privacy-section-title">3. Sharing Your Information</h2>
      <p className="privacy-text">
        We may share your information with service providers, partners, payment processors, and authorities when required by law.
      </p>

      <h2 className="privacy-section-title">4. Cookies & Tracking Technologies</h2>
      <p className="privacy-text">
        We use cookies and similar technologies to collect usage information and remember your preferences. Disabling cookies may affect site functionality.
      </p>

      <h2 className="privacy-section-title">5. Data Security</h2>
      <p className="privacy-text">
        We implement reasonable security measures to protect your personal information, but no electronic transmission is 100% secure.
      </p>

      <h2 className="privacy-section-title">6. Children’s Privacy</h2>
      <p className="privacy-text">
        Our services are not intended for individuals under 18. We do not knowingly collect information from children. Contact us to delete any inadvertent data.
      </p>

      <h2 className="privacy-section-title">7. Changes to This Policy</h2>
      <p className="privacy-text">
        This policy may be updated periodically. The revised date will appear at the top. Continued use indicates acceptance.
      </p>

      <h2 className="privacy-section-title">8. Contact Us</h2>
      <p className="privacy-text">
        Quick Medics Pharmacy<br />
        Email: <a href="mailto:privacy@QuickMedicspharmacy.com" className="privacy-link">privacy@QuickMedicspharmacy.com</a><br />
        Phone: 0816 394 3804<br />
        Address: 2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG, Ayobo-Ipaja Rd, Ayobo, 100270
      </p>
    </div>
  );
}