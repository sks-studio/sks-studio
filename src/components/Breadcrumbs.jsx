import { Link } from 'react-router-dom';
import TransitionLink from './TransitionLink';

// items: [{ label, to? }] — the last item is the current page and is never a link.
// `plain` uses an ordinary Link (no page-wipe), for the admin.
export default function Breadcrumbs({ items, plain = false, className = 'breadcrumbs' }) {
    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol>
                {items.map((item, i) => {
                    const last = i === items.length - 1;
                    let content = <span aria-current={last ? 'page' : undefined}>{item.label}</span>;
                    if (item.to && !last) {
                        content = plain ? (
                            <Link to={item.to}>{item.label}</Link>
                        ) : (
                            <TransitionLink to={item.to} end>
                                {item.label}
                            </TransitionLink>
                        );
                    }
                    return <li key={`${i}-${item.label}`}>{content}</li>;
                })}
            </ol>
        </nav>
    );
}
