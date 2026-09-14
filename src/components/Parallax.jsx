import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/site';

// Moves its layer against the scroll relative to the parent's position in the viewport.
// The layer is oversized in CSS (.parallax-layer) so the movement never reveals an edge.
export default function Parallax({ speed = 0.12, className = '', children }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion()) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = el.parentElement.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
            el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [speed]);

    return (
        <div ref={ref} className={`parallax-layer ${className}`.trim()}>
            {children}
        </div>
    );
}
