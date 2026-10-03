import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <style>{`
        .ft-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: .85rem;
          transition: color .2s ease;
          display: block;
          padding: 4px 0;
        }
        .ft-link:hover { color: #ffffff; }

        .ft-social {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid #374151;
          color: #9ca3af;
          text-decoration: none;
          transition: all .25s ease;
          font-size: .85rem;
          font-weight: 700;
        }
        .ft-social:hover {
          background: #4f46e5;
          border-color: #4f46e5;
          color: #fff;
          transform: translateY(-3px);
        }

        .ft-col-title {
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 14px;
        }

        @media (max-width: 700px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .ft-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.inner}>
        <div className="ft-grid" style={styles.grid}>
          <div style={styles.brandCol}>
            <h3 style={styles.brand}>CarStore</h3>
            <p style={styles.brandText}>
              Your trusted place to find quality new and pre-owned vehicles.
              Browse, compare, and book a test drive in minutes.
            </p>

            <div style={styles.socials}>
              <a className="ft-social" href="#" aria-label="Facebook">f</a>
              <a className="ft-social" href="#" aria-label="Instagram">ig</a>
              <a className="ft-social" href="#" aria-label="Twitter">tw</a>
              <a className="ft-social" href="#" aria-label="YouTube">yt</a>
            </div>
          </div>

          <div>
            <h4 className="ft-col-title">Shop</h4>
            <Link className="ft-link" to="/products">All Vehicles</Link>
            <Link className="ft-link" to="/products">New Cars</Link>
            <Link className="ft-link" to="/products">Pre-Owned</Link>
            <Link className="ft-link" to="/products">Compare</Link>
          </div>

          <div>
            <h4 className="ft-col-title">Company</h4>
            <Link className="ft-link" to="/">About Us</Link>
            <Link className="ft-link" to="/services">Services</Link>
            <Link className="ft-link" to="/reviews">Reviews</Link>
            <Link className="ft-link" to="/">Contact</Link>
          </div>

          <div>
            <h4 className="ft-col-title">Support</h4>
            <a className="ft-link" href="#">Help Center</a>
            <a className="ft-link" href="#">Warranty</a>
            <a className="ft-link" href="#">Financing</a>
            <a className="ft-link" href="#">Privacy Policy</a>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.bottom}>
          <p style={styles.copy}>
            © {year} CarStore. All rights reserved.
          </p>

          <div style={styles.bottomLinks}>
            <a className="ft-link" href="#" style={{ display: 'inline', padding: '0 8px' }}>
              Terms
            </a>
            <span style={styles.dot}>·</span>
            <a className="ft-link" href="#" style={{ display: 'inline', padding: '0 8px' }}>
              Privacy
            </a>
            <span style={styles.dot}>·</span>
            <a className="ft-link" href="#" style={{ display: 'inline', padding: '0 8px' }}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '100%',
    background: '#0f172a',
    color: '#9ca3af',
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    padding: '56px 0 24px',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
    gap: 40,
    marginBottom: 40,
  },
  brandCol: { maxWidth: 320 },
  brand: {
    margin: '0 0 12px',
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  brandText: {
    margin: '0 0 20px',
    fontSize: '.85rem',
    lineHeight: 1.7,
    color: '#9ca3af',
  },
  socials: { display: 'flex', gap: 10 },
  divider: { height: 1, background: '#1f2937', marginBottom: 20 },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  copy: { margin: 0, fontSize: '.8rem', color: '#6b7280' },
  bottomLinks: { display: 'flex', alignItems: 'center', gap: 4 },
  dot: { color: '#374151', fontSize: '.8rem' },
};

// ❌ DO NOT add "export default Footer;" here — the top of the file already
// exports it via "export default function Footer()".