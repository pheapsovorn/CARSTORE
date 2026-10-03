import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CARS } from '../data/cars';

export default function AllProduct() {
  const [search, setSearch] = useState('');

  const filtered = CARS.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={styles.wrapper}>
      <style>{`
        .ap-item {
          position: relative;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 14px 14px 18px;
          transition:
            transform .45s cubic-bezier(.2,.9,.3,1.2),
            box-shadow .45s ease,
            border-color .45s ease;
          box-shadow:
            0 2px 4px rgba(15,23,42,.04),
            0 14px 30px -18px rgba(15,23,42,.22);
          -webkit-mask-image: linear-gradient(
            to bottom, #000 0%, #000 82%, transparent 100%
          );
          mask-image: linear-gradient(
            to bottom, #000 0%, #000 82%, transparent 100%
          );
          cursor: pointer;
          display: block;
        }
        .ap-item:hover {
          transform: translateY(-10px);
          border-color: #c7d2fe;
          box-shadow:
            0 4px 8px rgba(15,23,42,.05),
            0 24px 48px -22px rgba(79,70,229,.35);
        }

        .ap-stage {
          position: relative;
          width: 100%;
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
          border-radius: 14px;
          overflow: hidden;
        }

        .ap-stage::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 0;
          width: 30%;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(249,250,251,.9) 0%,
            rgba(249,250,251,.5) 50%,
            rgba(249,250,251,0) 100%
          );
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          -webkit-mask-image: linear-gradient(to right, #000 0%, #000 30%, transparent 100%);
          mask-image: linear-gradient(to right, #000 0%, #000 30%, transparent 100%);
        }

        .ap-img {
          position: relative;
          z-index: 2;
          max-width: 92%;
          max-height: 92%;
          object-fit: contain;
          border-radius: 5px;
          transition: transform .55s cubic-bezier(.2,.9,.3,1.4);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 15%);
          mask-image: linear-gradient(to right, transparent 0%, #000 15%);
        }
        .ap-item:hover .ap-img {
          transform: scale(1.06) translateY(-2px);
        }

        .ap-info { text-align: center; margin-top: 12px; }
        .ap-category {
          font-size: .7rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #6b7280;
        }
        .ap-title {
          font-size: .88rem;
          font-weight: 600;
          color: #1f2937;
          margin: 4px 0 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
          min-height: 2.7em;
        }
        .ap-price {
          display: inline-block;
          font-size: .85rem;
          font-weight: 700;
          color: #4f46e5;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(99,102,241,.1);
          transition: background .3s ease;
        }
        .ap-item:hover .ap-price {
          background: rgba(99,102,241,.18);
        }
      `}</style>

      <h2 style={styles.title}>All Vehicles</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search vehicles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {filtered.length === 0 && (
        <p style={styles.status}>No vehicles found.</p>
      )}

      {/* 4 per row */}
      <div style={styles.grid}>
        {filtered.map((c) => {
          // get the first variant's image + price
          const firstKey = Object.keys(c.variants || {})[0];
          const v = c.variants?.[firstKey] || {};

          return (
            <Link
              key={c.id}
              to={`/product/${c.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article className="ap-item">
                <div className="ap-stage">
                  {v.image ? (
                    <img
                      className="ap-img"
                      src={v.image}
                      alt={c.title}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', padding: 20, textAlign: 'center' }}>
                      {c.title}
                    </div>
                  )}
                </div>

                <div className="ap-info">
                  <span className="ap-category">{c.category}</span>
                  <h3 className="ap-title" title={c.title}>{c.title}</h3>
                  <span className="ap-price">
                    ${(v.price || 0).toLocaleString()}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    padding: '40px 0 56px',
    background: '#ffffff',
    overflow: 'hidden',
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    margin: '0 0 24px',
    padding: '0 32px',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#111827',
  },
  filters: {
    padding: '0 32px',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    padding: '10px 14px',
    fontSize: '.9rem',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    outline: 'none',
    background: '#fff',
    fontFamily: 'inherit',
    color: '#111827',
  },
  status: {
    padding: 24,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '.9rem',
  },
  /* 4 columns per row, with responsive breakpoints */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 24,
    padding: '0 32px',
  },
};