import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO } from '../content';
import { signIn } from '../lib/api';
import SafeImg from '../components/SafeImg';

export default function AdminLogin({ onDemo }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
            await signIn(email.trim(), password);
            // AdminApp picks up the new session through onAuthStateChange.
        } catch (err) {
            setError(err.message === 'Invalid login credentials' ? 'That email and password don’t match.' : err.message);
            setBusy(false);
        }
    };

    return (
        <div className="a-auth">
            <form className="a-auth-card" onSubmit={handleSubmit}>
                <span className="brand-mark">
                    <SafeImg src={LOGO} fallback={<span className="brand-fallback">SKS</span>} />
                </span>
                <div>
                    <h1>SKS Studio admin</h1>
                    <p>Sign in to manage clients and projects.</p>
                </div>
                <label className="a-field">
                    <span>Email</span>
                    <input
                        className="a-input"
                        type="email"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="a-field">
                    <span>Password</span>
                    <input
                        className="a-input"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && (
                    <p className="a-error" role="alert">
                        {error}
                    </p>
                )}
                <button className="a-btn a-btn-primary a-btn-block" disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
                <button type="button" className="a-btn a-btn-block" onClick={onDemo}>
                    Explore the demo
                </button>
                <Link to="/" className="a-link">
                    ← Back to site
                </Link>
            </form>
        </div>
    );
}
