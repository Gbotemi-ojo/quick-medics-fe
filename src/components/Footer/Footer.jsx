import React from "react";
import { Link } from "react-router-dom"; // Import Link for SPA navigation
import "./Footer.css";

// --- SVG Icons ---
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0022 12z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path>
  </svg>
);


const WhatsAppIconFloating = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.457l-6.354 1.654zm.789-21.217c2.169-2.168 5.041-3.344 8.084-3.344 6.058.003 10.99 4.934 10.99 10.991.001 2.932-1.127 5.676-3.134 7.683-2.008 2.008-4.753 3.135-7.683 3.134-1.834 0-3.593-.456-5.116-1.284l-.357-.214-3.792 1.016 1.03-3.716-.229-.365c-.875-1.44-1.373-3.12-1.373-4.882.001-6.056 4.932-10.989 10.989-10.989z"></path>
  </svg>
);

// --- Main Footer Component ---
export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-logo">Quick Medics</h3>
              <p className="footer-about">
                Dedicated to your family's health, Quick Medics 
                offers expert care and authentic drugs, ensuring wellness is always within your reach.
              </p>
              <div className="social-links">
                <a href="https://web.facebook.com/p/QuickMedics-Pharmacy-Ltd-61554023852848/?_rdc=1&_rdr#" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://www.instagram.com/quickmedics.rx/" aria-label="Instagram"><InstagramIcon /></a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Shop and Order</h4>
              <ul className="footer-links">
                <li><Link to="/shop?category=general">Shop General</Link></li>
                <li><Link to="/shop?category=supplements">Shop Supplements</Link></li>
                <li><Link to="/shop?category=cosmetics">Shop Beauty</Link></li>
                <li><Link to="/returns">Shipping & Returns</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Our Office Address</h4>
              <p>2,3,4,5 Guide Plaza, Alaja Road, Megida-Ipaja Lagos NG</p>
              <p>0816 394 3804</p>
              <p>
                <a href="mailto:hello@quickmedics.com" className="email-link">
                  hello@quickmedics.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© 2026 Quick Medics. All Rights Reserved.</p>
          <div className="bottom-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>

      <a href="https://wa.me/2348163943804" className="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer">
        <WhatsAppIconFloating />
      </a>
    </footer>
  );
}
