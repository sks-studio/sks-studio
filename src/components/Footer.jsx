import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, LEGAL_NAME, NAV } from '../content';
import TransitionLink from './TransitionLink';

export default function Footer() {
    return (
        <footer className="shell">
            <div className="footer-legal">
                <span>© {new Date().getFullYear()} SKS Studio</span>
                <span>{LEGAL_NAME} · South Africa</span>
            </div>
            <nav className="footer-links" aria-label="Footer">
                {NAV.filter((link) => link.to !== '/').map((link) => (
                    <TransitionLink key={link.to} to={link.to}>
                        {link.label}
                    </TransitionLink>
                ))}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <Link to="/admin" className="footer-admin">
                    Admin
                </Link>
            </nav>
        </footer>
    );
}
