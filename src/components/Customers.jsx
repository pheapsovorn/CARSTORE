import { useState } from 'react';

const CUSTOMERS = [
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@example.com',
    phone: '012 345 678',
    role: 'CUSTOMER',
    joined: '2024-01-15',
    orders: 3,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Carter',
    email: 'james.carter@example.com',
    phone: '011 222 333',
    role: 'CUSTOMER',
    joined: '2024-02-03',
    orders: 1,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    firstName: 'Sophia',
    lastName: 'Bennett',
    email: 'sophia.bennett@example.com',
    phone: '017 555 777',
    role: 'CUSTOMER',
    joined: '2024-03-21',
    orders: 5,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Reed',
    email: 'michael.reed@example.com',
    phone: '096 888 999',
    role: 'CUSTOMER',
    joined: '2024-04-10',
    orders: 2,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 5,
    firstName: 'Daniel',
    lastName: 'Hayes',
    email: 'daniel.hayes@example.com',
    phone: '010 111 222',
    role: 'CUSTOMER',
    joined: '2024-05-02',
    orders: 4,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 6,
    firstName: 'Olivia',
    lastName: 'Turner',
    email: 'olivia.turner@example.com',
    phone: '012 999 888',
    role: 'CUSTOMER',
    joined: '2024-06-11',
    orders: 6,
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 7,
    firstName: 'William',
    lastName: 'Brooks',
    email: 'william.brooks@example.com',
    phone: '093 456 789',
    role: 'CUSTOMER',
    joined: '2024-06-25',
    orders: 2,
    image: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    id: 8,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    phone: '—',
    role: 'ADMIN',
    joined: '2024-01-01',
    orders: 0,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
];

export default function Customers() {
  const [search, setSearch] = useState('');

  const filtered = CUSTOMERS.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  return (
    <section style={styles.wrapper}>
      <style>{`
        .cu-row { transition: background .2s ease; }
        .cu-row:hover { background: #f9fafb; }
        .cu-badge {
          display: inline-block;
          font-size: .65rem;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 999px;
        }
        .cu-badge.admin { background: #fef3c7; color: #92400e; }
        .cu-badge.customer { background: #e0e7ff; color: #3730a3; }
        .cu-avatar { transition: transform .3s ease, box-shadow .3s ease; }
        .cu-row:hover .cu-avatar {
          transform: scale(1.1);
          box-shadow: 0 6px 14px -4px rgba(99,102,241,.6);
        }
      `}</style>

      <div style={styles.header}>
        <h2 style={styles.title}>Customers</h2>
        <span style={styles.count}>{filtered.length} total</span>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={styles.empty}>No customers found.</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Orders</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="cu-row">
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <img
                        src={c.image}
                        alt={`${c.firstName} ${c.lastName}`}
                        className="cu-avatar"
                        style={styles.avatarImg}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${c.firstName}+${c.lastName}&background=6366f1&color=fff&size=128`;
                        }}
                      />
                      <span style={styles.name}>
                        {c.firstName} {c.lastName}
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>{c.email}</td>
                  <td style={styles.td}>{c.phone}</td>
                  <td style={styles.td}>
                    <span className={`cu-badge ${c.role === 'ADMIN' ? 'admin' : 'customer'}`}>
                      {c.role}
                    </span>
                  </td>
                  <td style={styles.td}>{c.joined}</td>
                  <td style={styles.td}>{c.orders}</td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn} type="button">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    padding: '40px 32px 56px',
    background: '#ffffff',
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  header: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 },
  title: { margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#111827' },
  count: { fontSize: '.85rem', color: '#6b7280', fontWeight: 500 },
  filters: { marginBottom: 24 },
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
  empty: { padding: 40, textAlign: 'center', color: '#6b7280', fontSize: '.9rem' },
  tableWrap: {
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    overflow: 'hidden',
    background: '#fff',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '.875rem' },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    background: '#f9fafb',
    color: '#6b7280',
    fontWeight: 600,
    fontSize: '.75rem',
    letterSpacing: '.04em',
    textTransform: 'uppercase',
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '14px 16px',
    color: '#1f2937',
    borderBottom: '1px solid #f3f4f6',
    verticalAlign: 'middle',
  },
  nameCell: { display: 'flex', alignItems: 'center', gap: 12 },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fff',
    boxShadow: '0 2px 6px rgba(15,23,42,.15)',
    flexShrink: 0,
  },
  name: { fontWeight: 600, color: '#111827' },
  actionBtn: {
    padding: '6px 14px',
    fontSize: '.78rem',
    fontWeight: 600,
    border: '1px solid #e5e7eb',
    background: '#fff',
    color: '#111827',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
};