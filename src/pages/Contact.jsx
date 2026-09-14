import { useState } from 'react';
import { CONTACT_EMAIL, CONTACT_METHODS, CONTACT_SUBJECTS, PAGES } from '../content';
import { submitEnquiry } from '../lib/api';
import { isEmail, mailtoHref, usePageTitle } from '../lib/site';
import PageHero from '../components/PageHero';
import { useWizard } from '../components/Wizard';

const INITIAL = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: CONTACT_SUBJECTS[0],
    contactMethod: CONTACT_METHODS[0],
    message: '',
    consent: false,
};

export default function Contact() {
    usePageTitle('Contact');
    const openWizard = useWizard();
    const [form, setForm] = useState(INITIAL);
    const [attempted, setAttempted] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const missing = [
        !form.name.trim() && 'your name',
        !isEmail(form.email) && 'a valid email address',
        !form.message.trim() && 'a message',
        !form.consent && 'your consent',
    ].filter(Boolean);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAttempted(true);
        if (missing.length || status === 'sending') return;
        setStatus('sending');
        try {
            await submitEnquiry({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim() || null,
                company: form.company.trim() || null,
                subject: form.subject,
                contact_method: form.contactMethod,
                message: form.message.trim(),
                source: 'contact',
            });
            setStatus('sent');
        } catch {
            setStatus('failed');
        }
    };

    const fallbackMail = mailtoHref(`${form.subject} — ${form.name.trim()}`, [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Phone: ${form.phone.trim() || '—'}`,
        `Company: ${form.company.trim() || '—'}`,
        `Prefers: ${form.contactMethod}`,
        '',
        form.message.trim(),
    ]);

    return (
        <>
            <PageHero {...PAGES.contact} />

            <section className="shell contact-grid reveal">
                <div className="contact-aside">
                    <div className="eyebrow">Talk to SKS Studio</div>
                    <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                        {CONTACT_EMAIL}
                    </a>
                    <p className="contact-note">
                        Send us a message with the form, or email us directly. We work remotely across South Africa and
                        reply to every message.
                    </p>
                    <div className="contact-plan">
                        <strong>Planning a project?</strong>
                        <p>The project wizard walks you through a full brief in about two minutes.</p>
                        <button className="btn" type="button" onClick={() => openWizard()}>
                            Start the project wizard <span>↗</span>
                        </button>
                    </div>
                </div>

                {status === 'sent' ? (
                    <div className="contact-card" role="status">
                        <div className="eyebrow">Message received</div>
                        <p className="contact-thanks">
                            Thank you, {form.name.trim().split(' ')[0]}. We’ll get back to you by{' '}
                            {form.contactMethod.toLowerCase()} soon.
                        </p>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                setForm(INITIAL);
                                setAttempted(false);
                                setStatus('idle');
                            }}
                        >
                            Send another message <span>↗</span>
                        </button>
                    </div>
                ) : (
                    <form className="contact-card contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="eyebrow">Send us a message</div>
                        <div className="form-grid">
                            <label className="form-field">
                                <span>Name *</span>
                                <input className="field" autoComplete="name" value={form.name} onChange={set('name')} />
                            </label>
                            <label className="form-field">
                                <span>Email *</span>
                                <input
                                    className="field"
                                    type="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={set('email')}
                                />
                            </label>
                            <label className="form-field">
                                <span>Phone</span>
                                <input
                                    className="field"
                                    type="tel"
                                    autoComplete="tel"
                                    value={form.phone}
                                    onChange={set('phone')}
                                />
                            </label>
                            <label className="form-field">
                                <span>Company</span>
                                <input
                                    className="field"
                                    autoComplete="organization"
                                    value={form.company}
                                    onChange={set('company')}
                                />
                            </label>
                            <label className="form-field">
                                <span>Subject *</span>
                                <select className="field" value={form.subject} onChange={set('subject')}>
                                    {CONTACT_SUBJECTS.map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-field">
                                <span>Best way to reach you</span>
                                <select className="field" value={form.contactMethod} onChange={set('contactMethod')}>
                                    {CONTACT_METHODS.map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="form-field full">
                                <span>Message *</span>
                                <textarea className="field" rows="5" value={form.message} onChange={set('message')} />
                            </label>
                            <label className="consent full">
                                <input type="checkbox" checked={form.consent} onChange={set('consent')} />
                                <span>
                                    I agree that SKS Studio may use these details to reply to my message. We never share
                                    them.
                                </span>
                            </label>
                        </div>

                        {attempted && missing.length > 0 && (
                            <p className="form-note form-error" role="alert">
                                Please add {missing.join(', ')}.
                            </p>
                        )}
                        {status === 'failed' && (
                            <p className="form-note form-error" role="alert">
                                We couldn’t send that just now. <a href={fallbackMail}>Email it to us instead</a>.
                            </p>
                        )}

                        <button type="submit" className="btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending…' : 'Send message'} <span>↗</span>
                        </button>
                    </form>
                )}
            </section>
        </>
    );
}
