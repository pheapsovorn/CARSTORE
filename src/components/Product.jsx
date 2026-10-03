import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CARS } from "../data/cars";

function Stars({ rating, size = 18 }) {
  const safe = Number.isFinite(Number(rating))
    ? Math.max(0, Math.min(5, Number(rating)))
    : 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(safe - (i - 1), 0), 1);
    stars.push(
      <span
        key={i}
        style={{
          position: "relative",
          display: "inline-block",
          width: size,
          height: size,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            color: "#d1d5db",
            fontSize: size,
          }}
        >
          ★
        </span>
        <span
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            width: `${fill * 100}%`,
            color: "#f59e0b",
            fontSize: size,
          }}
        >
          ★
        </span>
      </span>,
    );
  }
  return <span style={{ display: "inline-flex", gap: 3 }}>{stars}</span>;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const t = setTimeout(() => {
      if (cancelled) return;
      const found = CARS.find((c) => String(c.id) === String(id));
      if (found) setCar(found);
      else setError("Product not found");
      setLoading(false);
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [id]);

  if (loading) return <p style={styles.status}>Loading…</p>;

  if (error || !car) {
    return (
      <div style={styles.status}>
        <p style={{ color: "#e11d48" }}>⚠ {error || "Not found"}</p>
        <Link to="/" style={styles.backLink}>
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <nav style={styles.breadcrumb}>
        <Link to="/" style={styles.crumb}>
          Home
        </Link>
        <span style={styles.crumbSep}>/</span>
        <span style={styles.crumbActive}>{car.title}</span>
      </nav>

      <div style={styles.grid}>
        <div style={styles.imgCard}>
          <div style={styles.stage}>
            <img src={car.image} alt={car.title} style={styles.img} />
          </div>
        </div>

        <div style={styles.info}>
          <span style={styles.categoryPill}>{car.category}</span>
          <h1 style={styles.title}>{car.title}</h1>

          <div style={styles.ratingRow}>
            <Stars rating={car.rating} />
            <span style={styles.ratingNum}>{car.rating.toFixed(1)}</span>
            <span style={styles.ratingCount}>(128 reviews)</span>
          </div>

          <p style={styles.description}>{car.description}</p>

          <div style={styles.priceRow}>
            <span style={styles.price}>${car.price.toLocaleString()}</span>
            <span style={styles.priceNote}>Free delivery</span>
          </div>

          <div style={styles.actions}>
            <button style={styles.btnPrimary} type="button">
              Add to Cart
            </button>
            <button style={styles.btnGhost} type="button">
              ♡ Save
            </button>
          </div>

          <ul style={styles.specs}>
            <li style={styles.specItem}>
              <span style={styles.specKey}>Condition</span>
              <span style={styles.specVal}>New</span>
            </li>
            <li style={styles.specItem}>
              <span style={styles.specKey}>Warranty</span>
              <span style={styles.specVal}>3 years</span>
            </li>
            <li style={styles.specItem}>
              <span style={styles.specKey}>Delivery</span>
              <span style={styles.specVal}>2–5 days</span>
            </li>
            <li style={styles.specItem}>
              <span style={styles.specKey}>Availability</span>
              <span style={styles.specVal}>In stock</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px 64px",
    background: "#fff",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  status: { padding: 48, textAlign: "center", color: "#6b7280" },
  backLink: { color: "#4f46e5", fontWeight: 600, textDecoration: "none" },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: ".85rem",
    color: "#6b7280",
    marginBottom: 24,
  },
  crumb: { color: "#6b7280", textDecoration: "none" },
  crumbSep: { color: "#d1d5db" },
  crumbActive: { color: "#111827", fontWeight: 600 },
  grid: { display: "grid", gridTemplateColumns: "1fr", gap: 32 },
  imgCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 20,
    boxShadow:
      "0 2px 4px rgba(15,23,42,.04), 0 14px 30px -18px rgba(15,23,42,.22)",
  },
  stage: {
    width: "100%",
    height: 380,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f9fafb",
    borderRadius: 14,
    overflow: "hidden",
  },
  img: {
    maxWidth: "92%",
    maxHeight: "92%",
    objectFit: "contain",
    mixBlendMode: "multiply",
    borderRadius: 6,
  },
  info: { display: "flex", flexDirection: "column", gap: 16 },
  categoryPill: {
    alignSelf: "flex-start",
    fontSize: ".72rem",
    fontWeight: 700,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    color: "#4f46e5",
    background: "rgba(99,102,241,.1)",
    padding: "5px 12px",
    borderRadius: 999,
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 800,
    color: "#111827",
    lineHeight: 1.2,
  },
  ratingRow: { display: "flex", alignItems: "center", gap: 8 },
  ratingNum: { fontSize: ".9rem", fontWeight: 700, color: "#1f2937" },
  ratingCount: { fontSize: ".85rem", color: "#6b7280" },
  description: {
    fontSize: ".95rem",
    color: "#4b5563",
    lineHeight: 1.7,
    margin: 0,
  },
  priceRow: { display: "flex", alignItems: "baseline", gap: 12 },
  price: { fontSize: "2rem", fontWeight: 800, color: "#4f46e5" },
  priceNote: { fontSize: ".8rem", color: "#10b981", fontWeight: 600 },
  actions: { display: "flex", gap: 12, flexWrap: "wrap" },
  btnPrimary: {
    flex: "1 1 180px",
    padding: "14px 22px",
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontSize: ".95rem",
    fontWeight: 700,
    cursor: "pointer",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    boxShadow: "0 10px 24px -10px rgba(99,102,241,.8)",
  },
  btnGhost: {
    padding: "14px 22px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#1f2937",
    fontSize: ".95rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  specs: {
    listStyle: "none",
    margin: "12px 0 0",
    padding: 0,
    borderTop: "1px solid #eef0f3",
  },
  specItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eef0f3",
    fontSize: ".9rem",
  },
  specKey: { color: "#6b7280" },
  specVal: { color: "#111827", fontWeight: 600 },
};

export default ProductDetail;
