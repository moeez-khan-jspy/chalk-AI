export default function Footer() {
  return (
    <footer className="footer-section">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-panel">
          <div className="footer-content">
            {/* Logo and Accessibility */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="flex items-center gap-3">
                  {/* Logo Icon */}
                  <div className="flex items-center">
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g transform="translate(5, 8)">
                        <path d="M4 0 L8 3 L4 6 L0 3 Z" fill="#FF3D8F" />
                        <path d="M12 0 L16 3 L12 6 L8 3 Z" fill="#FF3D8F" />
                        <path d="M4 9 L8 12 L4 15 L0 12 Z" fill="#FF3D8F" />
                      </g>
                    </svg>
                  </div>
                  {/* Logo Text */}
                  <div className="flex flex-col -ml-1">
                    <span className="footer-logo-text">TECH TEACH</span>
                    <span className="footer-logo-subtext">formerly Quizizz</span>
                  </div>
                </div>
              </div>

              <button className="footer-accessibility-btn">
                <svg
                  className="footer-accessibility-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
                  <circle cx="12" cy="8" r="1.5" />
                  <path d="M12 10.5c-2 0-3.5 1-3.5 2.5v4h1.5v-4c0-.5.5-1 2-1s2 .5 2 1v4H15v-4c0-1.5-1.5-2.5-3.5-2.5z" />
                </svg>
                <span>Accessibility</span>
              </button>
            </div>

            {/* Footer Links Columns */}
            <div className="footer-links-grid">
              {/* Column 1 */}
              <div className="footer-links-column">
                <a href="#" className="footer-link">
                  School &amp; District
                </a>
                <a href="#" className="footer-link">
                  Blog
                </a>
                <a href="#" className="footer-link">
                  For Business
                </a>
                <a href="#" className="footer-link">
                  About us
                </a>
                <a href="#" className="footer-link">
                  Webinars
                </a>
                <a href="#" className="footer-link">
                  Help Center
                </a>
              </div>

              {/* Column 2 */}
              <div className="footer-links-column">
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <a href="#" className="footer-link">
                  Privacy Center
                </a>
                <a href="#" className="footer-link">
                  Careers
                </a>
                <a href="#" className="footer-link">
                  Press Kit
                </a>
              </div>
            </div>

            {/* App Download Buttons */}
            <div className="footer-apps">
              <a href="#" className="footer-app-button">
                <svg
                  className="footer-app-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5H9c.55 0 1 .45 1 1v18c0 .55-.45 1-1 1H4.5c-.83 0-1.5-.67-1.5-1.5zM14 3.5c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-4c-.83 0-1.5-.67-1.5-1.5v-17z" />
                </svg>
                <div className="footer-app-text">
                  <span className="footer-app-label">GET IT ON</span>
                  <span className="footer-app-name">Google Play</span>
                </div>
              </a>
              <a href="#" className="footer-app-button">
                <svg
                  className="footer-app-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="footer-app-text">
                  <span className="footer-app-label">Download on the</span>
                  <span className="footer-app-name">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                2025 Quizizz Inc.{" "}
                <span className="footer-copyright-italic">
                  (DBA Wayground)
                </span>
              </p>

              <div className="footer-social">
                <a href="#" className="footer-social-link" aria-label="Pinterest">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="footer-social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

