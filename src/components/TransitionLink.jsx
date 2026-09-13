import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../lib/site';

const WIPE_MS = 520;

// A NavLink that plays the green page-wipe before changing route.
export default function TransitionLink({ to, onClick, ...props }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleClick = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (to === pathname || prefersReducedMotion()) return;

        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => {
            navigate(to);
            requestAnimationFrame(() => document.body.classList.remove('page-leaving'));
        }, WIPE_MS);
    };

    return <NavLink to={to} onClick={handleClick} {...props} />;
}
