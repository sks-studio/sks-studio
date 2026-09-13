import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LOGO, NAV } from '../content';
import SafeImg from './SafeImg';
import TransitionLink from './TransitionLink';

export default function Header() {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => setMenuOpen(false), [pathname]);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem('sks-theme', next);
        } catch {
            // Storage blocked — the toggle still works for this visit.
        }
        setTheme(next);
    };

    const links = NAV.map((link) => (
        <TransitionLink key={link.to} to={link.to} end={link.to === '/'}>
            {link.label}
        </TransitionLink>
    ));

    return (
        <header className="shell">
            <TransitionLink to="/" className="brand" aria-label="SKS Studio home">
                <span className="brand-mark">
                    <SafeImg src={LOGO} fallback={<span className="brand-fallback">SKS</span>} />
                </span>
                <span className="brand-title">
                    <span>SKS</span>
                    <span>STUDIO</span>
                </span>
            </TransitionLink>

            <nav className="desktop-nav" aria-label="Main">
                {links}
            </nav>

            <div className="header-actions">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? '☀' : '◐'}
                </button>
                <div className="mobile-menu">
                    <button
                        className="menu-button"
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    />
                    {menuOpen && (
                        <nav className="mobile-panel" aria-label="Mobile">
                            {links}
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
