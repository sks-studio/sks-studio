import { usePageTitle } from '../lib/site';
import TransitionLink from '../components/TransitionLink';

export default function NotFound() {
    usePageTitle('Page not found');
    return (
        <section className="shell not-found">
            <div className="eyebrow">404</div>
            <h1 className="section-title">This page doesn’t exist.</h1>
            <TransitionLink to="/" className="btn">
                Back home <span>↗</span>
            </TransitionLink>
        </section>
    );
}
