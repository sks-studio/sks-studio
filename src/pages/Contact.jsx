import { useState } from 'react';
import { CONTACT_EMAIL, PAGES } from '../content';
import { isEmail, mailtoHref, usePageTitle } from '../lib/site';
import PageHero from '../components/PageHero';

export default function Contact() {
    usePageTitle('Contact');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [need, setNeed] = useState('');
    const [prepared, setPrepared] = useState(false);
    const valid = name.trim() !== '' && isEmail(email) && need.trim() !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!valid) return;
        window.location.href = mailtoHref(`Enquiry from ${name.trim()}`, [
            `Name: ${name.trim()}`,
            `Email: ${email.trim()}`,
            `What the business needs: ${need.trim()}`,
        ]);
        setPrepared(true);
    };

    return (
        <>
            <PageHero {...PAGES.contact} />

            <section className="shell contact-grid reveal">
                <div>
                    <div className="eyebrow">Talk to SKS Studio</div>
                    <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                        {CONTACT_EMAIL}
                    </a>
                    <p className="contact-note">
                        Questions and partnerships are welcome here. Project planning happens separately through the
                        short form.
                    </p>
                </div>

                <form className="contact-card" onSubmit={handleSubmit} noValidate>
                    <div className="eyebrow">Start a project</div>
                    <input
                        className="field"
                        placeholder="Your name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="field"
                        type="email"
                        placeholder="Email address"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="field"
                        placeholder="What does your business need?"
                        value={need}
                        onChange={(e) => setNeed(e.target.value)}
                    />
                    <button type="submit" className="btn" disabled={!valid}>
                        Prepare enquiry <span>↗</span>
                    </button>
                    {prepared && (
                        <p className="form-note" role="status">
                            Your email app should open with the enquiry ready to send.
                        </p>
                    )}
                </form>
            </section>
        </>
    );
}
