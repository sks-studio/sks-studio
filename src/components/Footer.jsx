import { CONTACT_EMAIL, LEGAL_NAME } from '../content';
import TransitionLink from './TransitionLink';

export default function Footer() {
    return (
        <footer className="shell">
            <div className="footer-legal">
                <span>© {new Date().getFullYear()} SKS Studio</span>
                <span>{LEGAL_NAME} · South Africa</span>
            </div>
            <nav className="footer-links" aria-label="Footer">
                <TransitionLink to="/services">Services</TransitionLink>
                <TransitionLink to="/projects">Projects</TransitionLink>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </nav>
        </footer>
    );
}
