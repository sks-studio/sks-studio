import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/site';

const MIN_SHOW_MS = 900;
const MAX_WAIT_MS = 2500;

// The infinity path the "SYSTEMS · KNOWLEDGE · SOFTWARE" text orbits along.
const INFINITY =
    'M230,80 C290,10 400,10 400,80 C400,150 290,150 230,80 C170,10 60,10 60,80 C60,150 170,150 230,80 Z';

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        document.body.classList.add('loading');
        let done = false;
        let showTimer;
        const reveal = () => {
            if (done) return;
            done = true;
            showTimer = setTimeout(() => {
                setHidden(true);
                document.body.classList.remove('loading');
            }, prefersReducedMotion() ? 0 : MIN_SHOW_MS);
        };
        // Reveal once the page has loaded, but never hold visitors longer than MAX_WAIT_MS.
        const capTimer = setTimeout(reveal, MAX_WAIT_MS);
        if (document.readyState === 'complete') reveal();
        else window.addEventListener('load', reveal, { once: true });

        return () => {
            clearTimeout(showTimer);
            clearTimeout(capTimer);
            window.removeEventListener('load', reveal);
            document.body.classList.remove('loading');
        };
    }, []);

    if (gone) return null;

    return (
        <div
            className={`preloader${hidden ? ' hide' : ''}`}
            aria-hidden="true"
            onTransitionEnd={(e) => hidden && e.target === e.currentTarget && setGone(true)}
        >
            <div className="infinity-loader">
                <svg viewBox="0 0 460 160">
                    <path id="infinity-path" d={INFINITY} />
                    <text>
                        <textPath href="#infinity-path" startOffset="0%">
                            SYSTEMS · KNOWLEDGE · SOFTWARE ·
                            <animate attributeName="startOffset" from="-45%" to="100%" dur="4.8s" repeatCount="indefinite" />
                        </textPath>
                    </text>
                </svg>
                <div className="loader-name">SKS STUDIO</div>
            </div>
        </div>
    );
}
