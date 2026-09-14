import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../lib/site';

const WIPE_MS = 560; // navy panel slides up and covers the page
const HOLD_MS = 380; // logo stays on screen while the new page renders underneath

// A NavLink that plays the logo page-wipe (see PageWipe) before changing route.
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
            setTimeout(() => document.body.classList.remove('page-leaving'), HOLD_MS);
        }, WIPE_MS);
    };

    return <NavLink to={to} onClick={handleClick} {...props} />;
}
