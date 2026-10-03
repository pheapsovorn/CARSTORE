import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CARS } from '../data/cars';

function Stars({ rating, size = 14 }) {
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

export default function FeatureProduct() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setCars(CARS);
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <p style={{ padding: 24 }}>Loading cars…</p>;
  if (!cars.length) return <p style={{ padding: 24 }}>No cars found.</p>;

  const loop = [...cars, ...cars];

  return (
    <section style={styles.wrapper}>
      <style>{`
        @keyframes fp-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .fp-track { animation: fp-scroll linear infinite; will-change: transform; }
        .fp-marquee:hover .fp-track { animation-play-state: paused; }

        .fp-item {
          position: relative;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 14px 14px 18px;
          transition: transform .45s cubic-bezier(.2,.9,.3,1.2), box-shadow .45s ease, border-color .45s ease;
          box-shadow: 0 2px 4px rgba(15,23,42,.04), 0 14px 30px -18px rgba(15,23,42,.22);
          cursor: pointer;
          display: block;
        }
        .fp-item:hover {
          transform: translateY(-10px);
          border-color: #c7d2fe;
          box-shadow: 0 4px 8px rgba(15,23,42,.05), 0 24px 48px -22px rgba(79,70,229,.35);
        }

        .fp-stage {
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
        .fp-sharp {
          max-width: 92%;
          max-height: 92%;
          object-fit: contain;
          border-radius: 5px;
          transition: transform .55s cubic-bezier(.2,.9,.3,1.4);
        }
        .fp-item:hover .fp-sharp { transform: scale(1.06) translateY(-2px); }

        .fp-info { text-align: center; margin-top: 12px; }
        .fp-title {
          font-size: .88rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 6px;
          line-height: 1.35;
          min-height: 2.7em;
        }
        .fp-rate-row { display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 8px; }
        .fp-rate-num { font-size: .78rem; font-weight: 600; color: #6b7280; }
        .fp-price {
          display: inline-block;
          font-size: .85rem;
          font-weight: 700;
          color: #4f46e5;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(99,102,241,.1);
        }
      `}</style>

      <h2 style={styles.title}>Featured Cars &amp; Bikes</h2>

      <div className="fp-marquee" style={styles.marquee}>
        <div className="fp-track" style={{ ...styles.track, animationDuration: `${cars.length * 4}s` }}>
          {loop.map((c, i) => {
            const firstCond = Object.keys(c.variants || {})[0];
            const v = c.variants?.[firstCond] || {};
            return (
              <Link key={`${c.id}-${i}`} to={`/product/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article className="fp-item" style={styles.item}>
                  <div className="fp-stage" style={styles.stage}>
                    <img className="fp-sharp" src={c.image} alt={c.title} loading="lazy" />
                  </div>
                  <div className="fp-info">
                    <h3 className="fp-title" title={c.title}>{c.title}</h3>
                    <div className="fp-rate-row">
                      <Stars rating={c.rating} />
                      <span className="fp-rate-num">{(c.rating ?? 0).toFixed(1)}</span>
                    </div>
                    <span className="fp-price">${(v.price || 0).toLocaleString()}</span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  wrapper: { width: '100%', padding: '40px 0 56px', background: '#fff', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' },
  title: { margin: '0 0 24px', padding: '0 32px', fontSize: '1.5rem', fontWeight: 700, color: '#111827' },
  marquee: { width: '100%', overflow: 'hidden', padding: '28px 0' },
  track: { display: 'flex', flexWrap: 'nowrap', gap: 28, width: 'max-content', padding: '0 28px' },
  item: { flex: '0 0 260px', width: 260, display: 'block' },
  stage: { position: 'relative', width: '100%', height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', borderRadius: 14, overflow: 'hidden' },
};