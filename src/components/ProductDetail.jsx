import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CARS } from '../data/cars';

function Stars({ rating, size = 16 }) {
  const safe = Number.isFinite(Number(rating))
    ? Math.max(0, Math.min(5, Number(rating)))
    : 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(safe - (i - 1), 0), 1);
    stars.push(
      <span key={i} style={{ position: 'relative', display: 'inline-block', width: size, height: size, lineHeight: 1 }}>
        <span style={{ position: 'absolute', inset: 0, color: '#d1d5db', fontSize: size }}>★</span>
        <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${fill * 100}%`, color: '#111827', fontSize: size }}>★</span>
      </span>
    );
  }
  return <span style={{ display: 'inline-flex', gap: 2 }}>{stars}</span>;
}

const CONDITIONS = ['New', 'Second Hand', 'Used'];

const ProductDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState('New');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      if (cancelled) return;
      const found = CARS.find((c) => String(c.id) === String(id));
      if (found) {
        setCar(found);
        setSelectedCondition('New');
      } else {
        setError('Product not found');
      }
      setLoading(false);
    }, 150);
    return () => { cancelled = true; clearTimeout(t); };
  }, [id]);

  if (loading) return <p style={styles.status}>Loading…</p>;
  if (error || !car) {
    return (
      <div style={styles.status}>
        <p style={{ color: '#e11d48' }}>⚠ {error || 'Not found'}</p>
        <Link to="/" style={styles.backLink}>← Back to list</Link>
      </div>
    );
  }

  const variant = car.variants?.[selectedCondition] || car.variants?.['New'] || {};
  const related = CARS.filter((c) => c.id !== car.id).slice(0, 4);

  return (
    <div style={styles.page}>
      <style>{`
        @media (min-width: 900px) {
          .pd-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        .pd-frame {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 16px;
          transition: box-shadow .35s ease, border-color .35s ease;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 92%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 92%, transparent 100%);
        }
        .pd-frame:hover {
          box-shadow: 0 4px 8px rgba(15,23,42,.05), 0 24px 48px -22px rgba(15,23,42,.25);
          border-color: #d1d5db;
        }
        .pd-main-img { animation: pd-fade .4s ease; }
        @keyframes pd-fade {
          from { opacity: 0; transform: scale(.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        .pd-cond-btn {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #6b7280;
          font-size: .82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all .25s ease;
          font-family: inherit;
        }
        .pd-cond-btn:hover { border-color: #d1d5db; color: #111827; }
        .pd-cond-btn.active { background: #111827; border-color: #111827; color: #fff; }
        .pd-item {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 12px 12px 16px;
          transition: transform .4s cubic-bezier(.2,.9,.3,1.2), box-shadow .35s ease, border-color .35s ease;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%);
          cursor: pointer;
          display: block;
        }
        .pd-item:hover {
          transform: translateY(-6px);
          border-color: #d1d5db;
          box-shadow: 0 4px 8px rgba(15,23,42,.05), 0 22px 44px -22px rgba(15,23,42,.28);
        }
        .pd-stage {
          width: 100%;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          border-radius: 12px;
          overflow: hidden;
        }
        .pd-sharp { max-width: 92%; max-height: 92%; object-fit: contain; border-radius: 4px; }
        .pd-info { text-align: center; margin-top: 10px; }
        .pd-title {
          font-size: .85rem;
          font-weight: 500;
          color: #1f2937;
          margin: 0 0 6px;
          line-height: 1.35;
          min-height: 2.7em;
        }
        .pd-rate-row { display: flex; align-items: center; justify-content: center; gap: 5px; margin-bottom: 6px; }
        .pd-rate-num { font-size: .75rem; color: #6b7280; }
        .pd-price { font-size: .9rem; font-weight: 700; color: #111827; }
      `}</style>

      <nav style={styles.breadcrumb}>
        <Link to="/" style={styles.crumb}>Home</Link>
        <span style={styles.crumbSep}>/</span>
        <span style={styles.crumbActive}>{car.title}</span>
      </nav>

      <div className="pd-grid" style={styles.grid}>
        <div className="pd-frame">
          <div style={styles.stage}>
            <img
              key={selectedCondition}
              className="pd-main-img"
              src={car.image}
              alt={car.title}
              style={{ ...styles.img, filter: variant.filter || 'none' }}
            />
          </div>
        </div>

        <div style={styles.info}>
          <span style={styles.category}>{car.category}</span>
          <h1 style={styles.title}>{car.title}</h1>

          <div style={styles.ratingRow}>
            <Stars rating={car.rating} />
            <span style={styles.ratingNum}>{car.rating.toFixed(1)}</span>
            <span style={styles.ratingCount}>(128 reviews)</span>
          </div>

          <p style={styles.description}>{variant.description}</p>
          <p style={styles.price}>${(variant.price || 0).toLocaleString()}</p>

          <div style={styles.conditionBlock}>
            <span style={styles.conditionLabel}>Condition</span>
            <div style={styles.conditionRow}>
              {CONDITIONS.map((c) => {
                const ok = !!car.variants?.[c];
                return (
                  <button
                    key={c}
                    type="button"
                    disabled={!ok}
                    onClick={() => ok && setSelectedCondition(c)}
                    className={`pd-cond-btn${selectedCondition === c ? ' active' : ''}`}
                    style={!ok ? { opacity: .4, cursor: 'not-allowed' } : undefined}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={styles.actions}>
            <button style={styles.btnPrimary} type="button">Add to Cart</button>
            <button style={styles.btnGhost} type="button">Save</button>
          </div>

          <ul style={styles.specs}>
            <li style={styles.specItem}><span style={styles.specKey}>Condition</span><span style={styles.specVal}>{selectedCondition}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Engine</span><span style={styles.specVal}>{variant.engine}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Power</span><span style={styles.specVal}>{variant.power}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Top speed</span><span style={styles.specVal}>{variant.topSpeed}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>0–100 km/h</span><span style={styles.specVal}>{variant.accel}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Warranty</span><span style={styles.specVal}>{variant.warranty}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Mileage</span><span style={styles.specVal}>{variant.mileage}</span></li>
            <li style={styles.specItem}><span style={styles.specKey}>Availability</span><span style={styles.specVal}>{variant.availability}</span></li>
          </ul>
        </div>
      </div>

      <section style={styles.relatedSection}>
        <h2 style={styles.relatedTitle}>You may also like</h2>
        <div style={styles.relatedGrid}>
          {related.map((r) => (
            <Link key={r.id} to={`/product/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="pd-item">
                <div className="pd-stage">
                  <img className="pd-sharp" src={r.image} alt={r.title} loading="lazy" />
                </div>
                <div className="pd-info">
                  <h3 className="pd-title" title={r.title}>{r.title}</h3>
                  <div className="pd-rate-row">
                    <Stars rating={r.rating} size={13} />
                    <span className="pd-rate-num">{r.rating.toFixed(1)}</span>
                  </div>
                  <span className="pd-price">
                    ${(r.variants?.['New']?.price || 0).toLocaleString()}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: { maxWidth: 1200, margin: '0 auto', padding: '28px 24px 48px', background: '#fff', fontFamily: 'Inter, system-ui, sans-serif' },
  status: { padding: 48, textAlign: 'center', color: '#6b7280' },
  backLink: { color: '#111827', fontWeight: 600, textDecoration: 'none' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: 8, fontSize: '.85rem', color: '#6b7280', marginBottom: 20 },
  crumb: { color: '#6b7280', textDecoration: 'none' },
  crumbSep: { color: '#d1d5db' },
  crumbActive: { color: '#111827', fontWeight: 600 },
  grid: { display: 'grid', gridTemplateColumns: '1fr', gap: 32, alignItems: 'start' },
  stage: { width: '100%', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: 12, overflow: 'hidden' },
  img: { maxWidth: '92%', maxHeight: '92%', objectFit: 'contain', borderRadius: 4, transition: 'filter .4s ease' },
  info: { display: 'flex', flexDirection: 'column', gap: 10 },
  category: { fontSize: '.7rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6b7280' },
  title: { margin: 0, fontSize: '1.65rem', fontWeight: 700, color: '#111827', lineHeight: 1.25, letterSpacing: '-0.01em' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 8 },
  ratingNum: { fontSize: '.85rem', fontWeight: 600, color: '#1f2937' },
  ratingCount: { fontSize: '.8rem', color: '#9ca3af' },
  description: { fontSize: '.9rem', color: '#4b5563', lineHeight: 1.6, margin: '2px 0 0' },
  price: { fontSize: '1.6rem', fontWeight: 700, color: '#111827', margin: '2px 0', letterSpacing: '-0.01em' },
  conditionBlock: { display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 },
  conditionLabel: { fontSize: '.75rem', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: '#9ca3af' },
  conditionRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  actions: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 },
  btnPrimary: { padding: '10px 20px', borderRadius: 8, border: '1px solid #111827', background: '#111827', color: '#fff', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer' },
  btnGhost: { padding: '10px 20px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#111827', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer' },
  specs: { listStyle: 'none', margin: '6px 0 0', padding: 0, borderTop: '1px solid #f3f4f6' },
  specItem: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '.85rem' },
  specKey: { color: '#9ca3af' },
  specVal: { color: '#111827', fontWeight: 500 },
  relatedSection: { marginTop: 48, paddingTop: 24, borderTop: '1px solid #f3f4f6' },
  relatedTitle: { margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 600, color: '#111827' },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 },
};

export default ProductDetail;