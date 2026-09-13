import { useState } from 'react';

// Renders `fallback` (or nothing) if the image fails to load, so a missing asset never shows a broken icon.
export default function SafeImg({ fallback = null, alt = '', ...props }) {
    const [failed, setFailed] = useState(false);
    if (failed) return fallback;
    return <img alt={alt} {...props} onError={() => setFailed(true)} />;
}
