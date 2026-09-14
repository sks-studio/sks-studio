import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

// { role: 'superadmin' | 'staff' | 'demo', email } for the signed-in person.
export const AdminContext = createContext({ role: null, email: null });
export const useAdmin = () => useContext(AdminContext);

export const ROLE_LABELS = { superadmin: 'Superadmin', staff: 'Staff', demo: 'Demo' };

export const CLIENT_STATUSES = [
    { id: 'new', label: 'New' },
    { id: 'contacted', label: 'Contacted' },
    { id: 'proposal', label: 'Proposal sent' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'lost', label: 'Lost' },
];

export const statusLabel = (id) => CLIENT_STATUSES.find((s) => s.id === id)?.label ?? id;

export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatZAR = (n) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n || 0);

// Turns database errors into something a person can act on.
export function friendlyError(err) {
    if (!err) return null;
    if (err.code === '23505') return 'Another project already uses that link. Change the slug and save again.';
    if (err.code === '42501') return 'You don’t have permission to do that. Try signing out and back in.';
    return err.message || String(err);
}

// Runs `loader` on mount and whenever `deps` change. `reload` re-runs it.
export function useLoad(loader, deps) {
    const [state, setState] = useState({ data: null, error: null, loading: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const run = useCallback(loader, deps);

    const reload = useCallback(async () => {
        setState((s) => ({ ...s, loading: true, error: null }));
        try {
            setState({ data: await run(), error: null, loading: false });
        } catch (error) {
            setState({ data: null, error, loading: false });
        }
    }, [run]);

    useEffect(() => {
        reload();
    }, [reload]);

    return { ...state, reload };
}

export function PageHead({ crumbs, title, sub, actions }) {
    return (
        <div className="a-head">
            <div>
                <Breadcrumbs items={crumbs} plain className="a-crumbs" />
                <h1>{title}</h1>
                {sub && <p>{sub}</p>}
            </div>
            {actions && <div className="a-actions">{actions}</div>}
        </div>
    );
}

export function Panel({ title, sub, action, children }) {
    return (
        <section className="a-panel">
            {(title || action) && (
                <div className="a-panel-head">
                    <div>
                        {title && <h2>{title}</h2>}
                        {sub && <p>{sub}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </section>
    );
}

export function StatTile({ label, value, sub }) {
    return (
        <div className="a-stat">
            <span>{label}</span>
            <strong>{value}</strong>
            {sub && <small>{sub}</small>}
        </div>
    );
}

export function Empty({ message, children }) {
    return (
        <div className="a-empty">
            <p>{message}</p>
            {children}
        </div>
    );
}

export function ErrorNote({ error }) {
    if (!error) return null;
    return (
        <p className="a-error" role="alert">
            {friendlyError(error)}
        </p>
    );
}

export function StatusBadge({ status }) {
    return <span className={`a-badge a-status-${status}`}>{statusLabel(status)}</span>;
}

export function Field({ label, hint, wide, children }) {
    return (
        <label className={`a-field${wide ? ' a-wide' : ''}`}>
            <span>{label}</span>
            {children}
            {hint && <small>{hint}</small>}
        </label>
    );
}

// Empty strings from inputs become null in the database.
export const orNull = (v) => (typeof v === 'string' && v.trim() === '' ? null : v);

// Database nulls become empty strings for controlled inputs.
export const toForm = (row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v ?? '']));
