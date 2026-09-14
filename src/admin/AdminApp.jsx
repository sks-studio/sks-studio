import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { SUPABASE_READY } from '../config';
import { signOut } from '../lib/api';
import { supabase } from '../lib/supabase';
import { usePageTitle } from '../lib/site';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import ClientDetail from './ClientDetail';
import Clients from './Clients';
import { getMyRole, setDemoMode } from './data';
import Overview from './Overview';
import ProjectEditor from './ProjectEditor';
import ProjectsList from './ProjectsList';
import Staff from './Staff';
import { AdminContext } from './ui';
import './admin.css';

const DEMO_KEY = 'sks-admin-demo';
const readDemo = () => {
    try {
        return sessionStorage.getItem(DEMO_KEY) === '1';
    } catch {
        return false;
    }
};
const writeDemo = (on) => {
    try {
        if (on) sessionStorage.setItem(DEMO_KEY, '1');
        else sessionStorage.removeItem(DEMO_KEY);
    } catch {
        // Storage blocked — demo still works for this page view.
    }
};

function Notice({ title, children }) {
    return (
        <div className="a-auth">
            <div className="a-auth-card">
                <h1>{title}</h1>
                {children}
                <Link to="/" className="a-link">
                    ← Back to site
                </Link>
            </div>
        </div>
    );
}

function Shell({ role, email, onExitDemo }) {
    return (
        <AdminContext.Provider value={{ role, email }}>
            <AdminLayout onExitDemo={onExitDemo}>
                <Routes>
                    <Route index element={<Overview />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="clients/new" element={<ClientDetail />} />
                    <Route path="clients/:id" element={<ClientDetail />} />
                    <Route path="projects" element={<ProjectsList />} />
                    <Route path="projects/new" element={<ProjectEditor />} />
                    <Route path="projects/:id" element={<ProjectEditor />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </AdminLayout>
        </AdminContext.Provider>
    );
}

export default function AdminApp() {
    usePageTitle('Admin');
    const [demo, setDemo] = useState(readDemo);
    const [session, setSession] = useState(undefined); // undefined = still checking
    const [role, setRole] = useState(undefined); // undefined = checking, null = not staff

    // Point the data layer at sample data or the database before any page loads.
    setDemoMode(demo);

    useEffect(() => {
        if (!supabase) return;
        supabase.auth.getSession().then(({ data }) => setSession(data.session));
        const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
        return () => data.subscription.unsubscribe();
    }, []);

    // Signing in isn't enough: the account must also be an active member of staff.
    useEffect(() => {
        if (!session || demo) {
            setRole(undefined);
            return;
        }
        let live = true;
        getMyRole()
            .then((r) => live && setRole(r ?? null))
            .catch(() => live && setRole(null));
        return () => {
            live = false;
        };
    }, [session, demo]);

    const enterDemo = () => {
        writeDemo(true);
        setDemo(true);
    };
    const exitDemo = () => {
        writeDemo(false);
        setDemo(false);
    };

    if (demo) return <Shell role="demo" email="demo@sksstudio.co.za" onExitDemo={exitDemo} />;

    if (!SUPABASE_READY) {
        return (
            <Notice title="Database not connected">
                <p>The live admin needs the sksstudiodb Supabase project. You can explore the demo meanwhile.</p>
                <button className="a-btn a-btn-primary a-btn-block" onClick={enterDemo}>
                    Explore the demo
                </button>
            </Notice>
        );
    }

    if (session === undefined || (session && role === undefined)) {
        return <div className="a-loading">Loading admin…</div>;
    }

    if (!session) return <AdminLogin onDemo={enterDemo} />;

    if (!role) {
        return (
            <Notice title="No admin access">
                <p>
                    {session.user.email} is signed in but isn’t an active member of SKS staff. Ask a superadmin to add
                    you.
                </p>
                <button className="a-btn" onClick={signOut}>
                    Sign out
                </button>
            </Notice>
        );
    }

    return <Shell role={role} email={session.user.email} />;
}
