import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
    BUDGETS,
    CONTACT_METHODS,
    FEATURES,
    GOALS,
    INDUSTRIES,
    PRODUCTS,
    SERVICES,
    STAGES,
    TEAM_SIZES,
    TIMELINES,
} from '../content';
import { submitEnquiry } from '../lib/api';
import { isEmail, mailtoHref } from '../lib/site';

const WizardContext = createContext(() => {});

// Returns openWizard(productId?) — pass a product id to skip straight to the "stage" step.
export const useWizard = () => useContext(WizardContext);

export function WizardProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [preset, setPreset] = useState(null);

    const openWizard = useCallback((productId = null) => {
        setPreset(productId);
        setOpen(true);
    }, []);
    const close = useCallback(() => setOpen(false), []);

    return (
        <WizardContext.Provider value={openWizard}>
            {children}
            {open && <Wizard preset={preset} onClose={close} />}
        </WizardContext.Provider>
    );
}

const PRODUCT_OPTIONS = [
    ...PRODUCTS.map((p) => ({ id: p.id, label: p.title, hint: p.text })),
    { id: 'unsure', label: 'Not sure yet', hint: 'Tell us the problem and we’ll recommend the right tool.' },
];
const ALL_FEATURES = [...new Set(Object.values(FEATURES).flat())];
const toOptions = (list) => list.map((label) => ({ id: label, label }));

const STEPS = [
    { key: 'product', label: 'Product' },
    { key: 'stage', label: 'Stage' },
    { key: 'features', label: 'Features' },
    { key: 'services', label: 'Services' },
    { key: 'business', label: 'Business' },
    { key: 'goals', label: 'Goals' },
    { key: 'budget', label: 'Budget & timing' },
    { key: 'contact', label: 'Contact' },
    { key: 'review', label: 'Review' },
];
const stepIndex = (key) => STEPS.findIndex((s) => s.key === key);

const INITIAL = {
    product: null,
    stage: null,
    features: [],
    services: [],
    company: '',
    industry: null,
    teamSize: null,
    goals: [],
    budget: null,
    timeline: null,
    name: '',
    email: '',
    phone: '',
    contactMethod: 'Email',
    notes: '',
    consent: false,
};

function Choices({ options, value, onChange, multiple = false, columns = 1, label }) {
    const isSelected = (id) => (multiple ? value.includes(id) : value === id);
    // Multi-select passes an updater so rapid clicks never overwrite each other.
    const toggle = (id) => {
        if (!multiple) return onChange(id);
        onChange((current) => (current.includes(id) ? current.filter((v) => v !== id) : [...current, id]));
    };
    return (
        <div className={`choices${columns > 1 ? ' choices-grid' : ''}`} role="group" aria-label={label}>
            {options.map((option) => (
                <button
                    type="button"
                    key={option.id}
                    className={`choice${isSelected(option.id) ? ' selected' : ''}`}
                    aria-pressed={isSelected(option.id)}
                    onClick={() => toggle(option.id)}
                >
                    <span className="choice-label">{option.label}</span>
                    {option.hint && <span className="choice-hint">{option.hint}</span>}
                </button>
            ))}
        </div>
    );
}

function Wizard({ preset, onClose }) {
    const [a, setA] = useState({ ...INITIAL, product: preset });
    const [step, setStep] = useState(preset ? 1 : 0);
    const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    // Accepts a value or an updater function (used by multi-select choices).
    const set = (key) => (value) =>
        setA((prev) => ({ ...prev, [key]: typeof value === 'function' ? value(prev[key]) : value }));
    const input = (key) => (e) => set(key)(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    // Features depend on the product, so changing product clears them.
    const setProduct = (product) => setA((prev) => ({ ...prev, product, features: [] }));

    const productLabel = PRODUCT_OPTIONS.find((p) => p.id === a.product)?.label;
    const stageLabel = STAGES.find((s) => s.id === a.stage)?.label;
    const featureList = FEATURES[a.product] ?? ALL_FEATURES;

    const valid = {
        product: Boolean(a.product),
        stage: Boolean(a.stage),
        features: true,
        services: true,
        business: Boolean(a.industry && a.teamSize),
        goals: a.goals.length > 0,
        budget: Boolean(a.budget && a.timeline),
        contact: a.name.trim() !== '' && isEmail(a.email) && a.consent,
        review: true,
    };
    const current = STEPS[step];
    const isLast = step === STEPS.length - 1;
    const sending = status === 'sending';

    const summary = [
        ['Product', productLabel, 'product'],
        ['Stage', stageLabel, 'stage'],
        ['Features', a.features.join(', ') || 'Not specified', 'features'],
        ['Services', a.services.join(', ') || 'Not specified', 'services'],
        ['Business', [a.company.trim(), a.industry, a.teamSize].filter(Boolean).join(' · '), 'business'],
        ['Goals', a.goals.join(', '), 'goals'],
        ['Budget', a.budget, 'budget'],
        ['Timeline', a.timeline, 'budget'],
        ['Contact', [a.name.trim(), a.email.trim(), a.phone.trim()].filter(Boolean).join(' · '), 'contact'],
        ['Prefers', a.contactMethod, 'contact'],
        ['Notes', a.notes.trim() || '—', 'contact'],
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!valid[current.key] || sending) return;
        if (!isLast) {
            setStep(step + 1);
            return;
        }
        setStatus('sending');
        try {
            await submitEnquiry({
                name: a.name.trim(),
                email: a.email.trim(),
                phone: a.phone.trim() || null,
                company: a.company.trim() || null,
                product: productLabel,
                stage: stageLabel,
                features: a.features.filter((f) => featureList.includes(f)),
                services: a.services,
                industry: a.industry,
                team_size: a.teamSize,
                goals: a.goals,
                budget: a.budget,
                timeline: a.timeline,
                contact_method: a.contactMethod,
                message: a.notes.trim() || null,
                source: 'wizard',
            });
            setStatus('sent');
        } catch {
            setStatus('failed');
        }
    };

    const renderStep = () => {
        switch (current.key) {
            case 'product':
                return (
                    <>
                        <h3>What would move your business forward?</h3>
                        <Choices label="Product" options={PRODUCT_OPTIONS} value={a.product} onChange={setProduct} />
                    </>
                );
            case 'stage':
                return (
                    <>
                        <h3>Where are you now?</h3>
                        <Choices label="Stage" options={STAGES} value={a.stage} onChange={set('stage')} />
                    </>
                );
            case 'features':
                return (
                    <>
                        <h3>What should it do?</h3>
                        <p className="wizard-note">Pick everything that applies — or skip if you’re not sure yet.</p>
                        <Choices
                            label="Features"
                            options={toOptions(featureList)}
                            value={a.features}
                            onChange={set('features')}
                            multiple
                            columns={2}
                        />
                    </>
                );
            case 'services':
                return (
                    <>
                        <h3>Where do you need our help?</h3>
                        <p className="wizard-note">Optional — choose any of our seven spaces.</p>
                        <Choices
                            label="Services"
                            options={SERVICES.map((s) => ({ id: s.title, label: s.title, hint: s.text }))}
                            value={a.services}
                            onChange={set('services')}
                            multiple
                            columns={2}
                        />
                    </>
                );
            case 'business':
                return (
                    <>
                        <h3>Tell us about your business.</h3>
                        <input
                            className="field"
                            placeholder="Business name (optional)"
                            autoComplete="organization"
                            value={a.company}
                            onChange={input('company')}
                        />
                        <span className="wizard-label">Industry</span>
                        <Choices
                            label="Industry"
                            options={toOptions(INDUSTRIES)}
                            value={a.industry}
                            onChange={set('industry')}
                            columns={2}
                        />
                        <span className="wizard-label">Team size</span>
                        <Choices
                            label="Team size"
                            options={toOptions(TEAM_SIZES)}
                            value={a.teamSize}
                            onChange={set('teamSize')}
                            columns={2}
                        />
                    </>
                );
            case 'goals':
                return (
                    <>
                        <h3>What matters most right now?</h3>
                        <p className="wizard-note">Choose at least one.</p>
                        <Choices
                            label="Goals"
                            options={toOptions(GOALS)}
                            value={a.goals}
                            onChange={set('goals')}
                            multiple
                            columns={2}
                        />
                    </>
                );
            case 'budget':
                return (
                    <>
                        <h3>Budget and timing.</h3>
                        <span className="wizard-label">Budget</span>
                        <Choices
                            label="Budget"
                            options={toOptions(BUDGETS)}
                            value={a.budget}
                            onChange={set('budget')}
                            columns={2}
                        />
                        <span className="wizard-label">Timeline</span>
                        <Choices
                            label="Timeline"
                            options={toOptions(TIMELINES)}
                            value={a.timeline}
                            onChange={set('timeline')}
                            columns={2}
                        />
                    </>
                );
            case 'contact':
                return (
                    <>
                        <h3>How do we reach you?</h3>
                        <input
                            className="field"
                            placeholder="Your name *"
                            autoComplete="name"
                            value={a.name}
                            onChange={input('name')}
                        />
                        <input
                            className="field"
                            type="email"
                            placeholder="Email address *"
                            autoComplete="email"
                            value={a.email}
                            onChange={input('email')}
                        />
                        <input
                            className="field"
                            type="tel"
                            placeholder="Phone (optional)"
                            autoComplete="tel"
                            value={a.phone}
                            onChange={input('phone')}
                        />
                        <span className="wizard-label">Best way to reach you</span>
                        <Choices
                            label="Preferred contact method"
                            options={toOptions(CONTACT_METHODS)}
                            value={a.contactMethod}
                            onChange={set('contactMethod')}
                            columns={3}
                        />
                        <textarea
                            className="field"
                            rows="3"
                            placeholder="Anything else we should know? (optional)"
                            value={a.notes}
                            onChange={input('notes')}
                        />
                        <label className="consent">
                            <input type="checkbox" checked={a.consent} onChange={input('consent')} />
                            <span>
                                I agree that SKS Studio may use these details to respond to my enquiry. We never share
                                them.
                            </span>
                        </label>
                    </>
                );
            case 'review':
                return (
                    <>
                        <h3>Check your brief.</h3>
                        <dl className="wizard-review">
                            {summary.map(([label, value, key]) => (
                                <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                    <button type="button" className="link-btn" onClick={() => setStep(stepIndex(key))}>
                                        Edit
                                    </button>
                                </div>
                            ))}
                        </dl>
                        {status === 'failed' && (
                            <p className="wizard-note form-error" role="alert">
                                We couldn’t send that just now.{' '}
                                <a
                                    href={mailtoHref(
                                        `Project brief — ${productLabel}`,
                                        summary.map(([label, value]) => `${label}: ${value}`),
                                    )}
                                >
                                    Email it to us instead
                                </a>
                                .
                            </p>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="wizard" role="dialog" aria-modal="true" aria-labelledby="wizard-title">
            <div className="wizard-bg" onClick={onClose} />
            <form className="wizard-card" onSubmit={handleSubmit} noValidate>
                <div className="wizard-top">
                    <strong id="wizard-title">SKS Project Wizard</strong>
                    <button type="button" className="wizard-close" onClick={onClose} aria-label="Close" autoFocus>
                        ✕
                    </button>
                </div>

                {status !== 'sent' && (
                    <div className="wizard-progress">
                        <span>
                            Step {step + 1} of {STEPS.length} · {current.label}
                        </span>
                        <div className="progress" aria-hidden="true">
                            {STEPS.map((s, i) => (
                                <i key={s.key} className={i <= step ? 'on' : ''} />
                            ))}
                        </div>
                    </div>
                )}

                {status === 'sent' ? (
                    <div className="wizard-step" role="status">
                        <small>Brief received</small>
                        <h3>Thank you, {a.name.trim().split(' ')[0]}.</h3>
                        <p className="wizard-note">
                            We’ve received your brief for the {productLabel}. We’ll contact you by{' '}
                            {a.contactMethod.toLowerCase()} soon.
                        </p>
                    </div>
                ) : (
                    <div className="wizard-step" key={current.key}>
                        <small>
                            {String(step + 1).padStart(2, '0')} / {current.label}
                        </small>
                        {renderStep()}
                    </div>
                )}

                <div className="wizard-actions">
                    {status === 'sent' ? (
                        <button type="button" className="btn" onClick={onClose}>
                            Close <span>↗</span>
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn back"
                                style={{ visibility: step ? 'visible' : 'hidden' }}
                                onClick={() => setStep(step - 1)}
                            >
                                Back
                            </button>
                            <button type="submit" className="btn" disabled={!valid[current.key] || sending}>
                                {sending
                                    ? 'Sending…'
                                    : isLast
                                      ? 'Send brief'
                                      : step === STEPS.length - 2
                                        ? 'Review brief'
                                        : 'Continue'}{' '}
                                <span>↗</span>
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
