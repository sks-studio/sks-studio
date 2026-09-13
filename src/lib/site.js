import { useEffect } from 'react';
import { CONTACT_EMAIL } from '../content';

export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} — SKS Studio` : 'SKS Studio — Business Software Made Simple';
    }, [title]);
}

// The site has no backend: enquiries open the visitor's email app with the brief pre-filled.
export function mailtoHref(subject, lines) {
    const body = encodeURIComponent(lines.join('\n'));
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

export const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim());
