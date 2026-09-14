import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LOGO } from '../content';
import { signOut } from '../lib/api';
import SafeImg from '../components/SafeImg';
import { ROLE_LABELS, useAdmin } from './ui';

const icon = (paths) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths}
    </svg>
);

const ICONS = {
    dashboard: icon(
        <>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
        </>,
    ),
    clients: icon(
        <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>,
    ),
    projects: icon(
        <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
        </>,
    ),
    staff: icon(
        <>
            <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
            <path d="M9 12l2 2 4-4" />
        </>,
    ),
    site: icon(
        <>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </>,
    ),
    logout: icon(
        <>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </>,
    ),
};

const NAV = [
    { section: 'Overview', items: [{ to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true }] },
    { section: 'Pipeline', items: [{ to: '/admin/clients', label: 'Clients', icon: 'clients' }] },
    { section: 'Content', items: [{ to: '/admin/projects', label: 'Projects', icon: 'projects' }] },
    { section: 'Team', items: [{ to: '/admin/staff', label: 'Staff', icon: 'staff' }] },
];

export default function AdminLayout({ onExitDemo, children }) {
    const { role, email } = useAdmin();
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const isDemo = role === 'demo';

    useEffect(() => setOpen(false), [pathname]);

    return (
        <div className="admin">
            <aside className={`a-side${open ? ' open' : ''}`}>
                <Link to="/admin" className="a-brand">
                    <span className="brand-mark">
                        <SafeImg src={LOGO} fallback={<span className="brand-fallback">SKS</span>} />
                    </span>
                    <span>
                        SKS <b>Admin</b>
                    </span>
                </Link>

                <nav aria-label="Admin">
                    {NAV.map(({ section, items }) => (
                        <div className="a-nav-sec" key={section}>
                            <p>{section}</p>
                            {items.map((item) => (
                                <NavLink key={item.to} to={item.to} end={item.end} className="a-nav-link">
                                    {ICONS[item.icon]}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                    <div className="a-nav-sec">
                        <p>Site</p>
                        <a className="a-nav-link" href="/" target="_blank" rel="noreferrer">
                            {ICONS.site}
                            <span>View site</span>
                        </a>
                    </div>
                </nav>

                <div className="a-side-foot">
                    <span className="a-user" title={email}>
                        {email}
                        <span className="a-badge">{ROLE_LABELS[role]}</span>
                    </span>
                    <button className="a-nav-link a-signout" onClick={isDemo ? onExitDemo : signOut}>
                        {ICONS.logout}
                        <span>{isDemo ? 'Exit demo' : 'Sign out'}</span>
                    </button>
                </div>
            </aside>

            {open && <div className="a-scrim" onClick={() => setOpen(false)} />}

            <div className="a-main">
                <div className="a-topbar">
                    <button
                        className="a-menu"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        aria-label="Admin menu"
                    >
                        ☰
                    </button>
                    <span>SKS Admin</span>
                </div>
                {isDemo && (
                    <div className="a-demo" role="note">
                        <span>
                            <b>Demo mode</b> — sample data only. Changes disappear when you reload or leave.
                        </span>
                        <button className="a-btn" onClick={onExitDemo}>
                            Exit demo
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
