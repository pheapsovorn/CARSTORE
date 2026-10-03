import { useState } from 'react';

const REVIEWS = [
  {
    id: 1,
    name: 'Emma Wilson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: '2024-08-12',
    car: 'BMW M4',
    title: 'Absolutely incredible car',
    text: 'The M4 exceeded every expectation. The delivery was smooth and the whole buying experience was top-notch. Highly recommend!',
  },
  {
    id: 2,
    name: 'James Carter',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '2024-08-05',
    car: 'Porsche 718 Cayman',
    title: 'Great handling, small back seat',
    text: 'The Cayman is a joy on twisty roads. Only downside is the tiny rear seats, but that\'s not what this car is about.',
  },
  {
    id: 3,
    name: 'Sophia Bennett',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    date: '2024-07-28',
    car: 'Toyota Supra',
    title: 'Perfect daily driver',
    text: 'Fast, comfortable, and reliable. The Supra is everything I wanted. Staff was very helpful throughout.',
  },
  {
    id: 4,
    name: 'Michael Reed',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4,
    date: '2024-07-20',
    car: 'Audi R8',
    title: 'Supercar feel, everyday usability',
    text: 'The R8 is surprisingly easy to live with. Quattro makes it usable in all weather. Would buy again.',
  },
  {
    id: 5,
    name: 'Daniel Hayes',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    date: '2024-07-14',
    car: 'Mercedes AMG GT',
    title: 'That V8 sound!',
    text: 'Nothing beats the AMG twin-turbo V8 rumble. The car turns every drive into an event.',
  },
  {
    id: 6,
    name: 'Olivia Turner',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    date: '2024-07-02',
    car: 'Ferrari 458',
    title: 'The last of the great N/A Ferraris',
    text: 'The 9000rpm redline is addictive. Natural aspiration at its finest. So glad I got one before they disappear.',
  },
];

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
        <span
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            width: `${fill * 100}%`,
            color: '#f59e0b',
            fontSize: size,
          }}
        >
          ★
        </span>
      </span>
    );
  }
  return <span style={{ display: 'inline-flex', gap: 2 }}>{stars}</span>;
}

export default function RatingCustomer() {
  const [filter, setFilter] = useState('all');

  const filtered = REVIEWS.filter((r) => {
    if (filter === 'all') return true;
    if (filter === '5') return r.rating === 5;
    if (filter === '4') return r.rating === 4;
    if (filter === '3') return r.rating === 3;
    return true;
  });

  // average
  const avg = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;

  return (
    <section style={styles.wrapper}>
      <style>{`
        .rc-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 20px;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
          box-shadow: 0 2px 4px rgba(15,23,42,.04);
        }
        .rc-card:hover {
          transform: translateY(-6px);
          border-color: #d1d5db;
          box-shadow: 0 4px 8px rgba(15,23,42,.05), 0 22px 44px -22px rgba(15,23,42,.28);
        }
        .rc-filter {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #6b7280;
          font-size: .82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all .25s ease;
          font-family: inherit;
        }
        .rc-filter:hover { border-color: #d1d5db; color: #111827; }
        .rc-filter.active {
          background: #111827;
          border-color: #111827;
          color: #fff;
        }
      `}</style>

      <div style={styles.header}>
        <h2 style={styles.title}>Customer Reviews</h2>
        <div style={styles.summary}>
          <span style={styles.avgNum}>{avg.toFixed(1)}</span>
          <Stars rating={avg} size={18} />
          <span style={styles.avgCount}>({REVIEWS.length} reviews)</span>
        </div>
      </div>

      <div style={styles.filters}>
        {[
          { key: 'all', label: 'All' },
          { key: '5', label: '5 ★' },
          { key: '4', label: '4 ★' },
          { key: '3', label: '3 ★' },
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            className={`rc-filter${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={styles.empty}>No reviews match this filter.</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((r) => (
            <article key={r.id} className="rc-card">
              <div style={styles.reviewHeader}>
                <img
                  src={r.image}
                  alt={r.name}
                  style={styles.avatar}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=6366f1&color=fff&size=128`;
                  }}
                />
                <div style={styles.reviewerInfo}>
                  <span style={styles.reviewerName}>{r.name}</span>
                  <span style={styles.reviewerDate}>{r.date}</span>
                </div>
              </div>

              <div style={styles.ratingRow}>
                <Stars rating={r.rating} size={15} />
                <span style={styles.ratingNum}>{r.rating.toFixed(1)}</span>
              </div>

              <h3 style={styles.reviewTitle}>{r.title}</h3>
              <p style={styles.reviewText}>{r.text}</p>

              <div style={styles.carTag}>
                <span style={styles.carTagLabel}>Purchased:</span>
                <span style={styles.carTagValue}>{r.car}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    padding: '48px 32px 64px',
    background: '#ffffff',
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },

  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#111827',
    letterSpacing: '-0.01em',
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  avgNum: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#111827',
  },
  avgCount: {
    fontSize: '.85rem',
    color: '#6b7280',
  },

  filters: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 28,
  },

  empty: {
    padding: 40,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '.9rem',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 20,
  },

  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fff',
    boxShadow: '0 2px 6px rgba(15,23,42,.15)',
    flexShrink: 0,
  },
  reviewerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  reviewerName: {
    fontSize: '.9rem',
    fontWeight: 700,
    color: '#111827',
  },
  reviewerDate: {
    fontSize: '.75rem',
    color: '#9ca3af',
  },

  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  ratingNum: {
    fontSize: '.78rem',
    fontWeight: 600,
    color: '#6b7280',
  },

  reviewTitle: {
    margin: '0 0 6px',
    fontSize: '.95rem',
    fontWeight: 700,
    color: '#111827',
    lineHeight: 1.35,
  },
  reviewText: {
    margin: 0,
    fontSize: '.85rem',
    color: '#4b5563',
    lineHeight: 1.6,
  },

  carTag: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingTop: 12,
    borderTop: '1px solid #f3f4f6',
    fontSize: '.78rem',
  },
  carTagLabel: {
    color: '#9ca3af',
  },
  carTagValue: {
    color: '#4f46e5',
    fontWeight: 600,
  },
};