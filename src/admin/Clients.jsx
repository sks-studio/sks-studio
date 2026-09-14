import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listClients } from './data';
import { CLIENT_STATUSES, Empty, ErrorNote, formatDate, PageHead, Panel, StatusBadge, useLoad } from './ui';

export function ClientTable({ clients }) {
    const navigate = useNavigate();
    return (
        <div className="a-table-wrap">
            <table className="a-table">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Interested in</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Received</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((c) => (
                        <tr key={c.id} onClick={() => navigate(`/admin/clients/${c.id}`)}>
                            <td>
                                <Link
                                    to={`/admin/clients/${c.id}`}
                                    className="a-strong"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {c.name}
                                </Link>
                                <small>{c.company || c.email}</small>
                            </td>
                            <td>{c.product || '—'}</td>
                            <td className="a-cap">{c.source}</td>
                            <td>
                                <StatusBadge status={c.status} />
                            </td>
                            <td>{formatDate(c.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const CSV_COLUMNS = [
    'name',
    'email',
    'phone',
    'company',
    'contact_method',
    'subject',
    'product',
    'stage',
    'industry',
    'team_size',
    'budget',
    'timeline',
    'services',
    'features',
    'goals',
    'source',
    'status',
    'value',
    'message',
    'notes',
    'created_at',
];

function downloadCsv(rows) {
    const cell = (v) => `"${String(Array.isArray(v) ? v.join('; ') : (v ?? '')).replace(/"/g, '""')}"`;
    const csv = [CSV_COLUMNS.join(','), ...rows.map((r) => CSV_COLUMNS.map((c) => cell(r[c])).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `sks-clients-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

export default function Clients() {
    const { data, error, loading } = useLoad(listClients, []);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('all');

    const all = data ?? [];
    const q = query.trim().toLowerCase();
    const shown = all.filter(
        (c) =>
            (status === 'all' || c.status === status) &&
            (!q || [c.name, c.email, c.company, c.product].some((v) => v?.toLowerCase().includes(q))),
    );

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Clients' }]}
                title="Clients"
                sub="Every enquiry from the wizard and contact form, plus clients you add yourself."
                actions={
                    <>
                        <button className="a-btn" onClick={() => downloadCsv(shown)} disabled={!shown.length}>
                            ↓ Download CSV
                        </button>
                        <Link className="a-btn a-btn-primary" to="/admin/clients/new">
                            Add client
                        </Link>
                    </>
                }
            />
            <ErrorNote error={error} />

            <Panel>
                <div className="a-toolbar">
                    <input
                        className="a-input"
                        type="search"
                        placeholder="Search name, email, company or product…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="a-chips">
                        {[{ id: 'all', label: 'All' }, ...CLIENT_STATUSES].map((s) => (
                            <button
                                key={s.id}
                                className={`a-chip${status === s.id ? ' on' : ''}`}
                                onClick={() => setStatus(s.id)}
                                aria-pressed={status === s.id}
                            >
                                {s.label}
                                <span>{s.id === 'all' ? all.length : all.filter((c) => c.status === s.id).length}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {shown.length > 0 ? (
                    <ClientTable clients={shown} />
                ) : (
                    <Empty
                        message={loading ? 'Loading…' : all.length ? 'No clients match that search.' : 'No clients yet.'}
                    />
                )}
            </Panel>
        </>
    );
}
