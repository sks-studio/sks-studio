import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CONTACT_EMAIL, PRODUCTS, STAGES } from '../content';
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

function Choices({ options, value, onChange }) {
    return (
        <div className="choices">
            {options.map((option) => (
                <button
                    type="button"
                    key={option.id}
                    className={`choice${value === option.id ? ' selected' : ''}`}
                    aria-pressed={value === option.id}
                    onClick={() => onChange(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

function Wizard({ preset, onClose }) {
    const [step, setStep] = useState(preset ? 1 : 0);
    const [product, setProduct] = useState(preset);
    const [stage, setStage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    const productTitle = PRODUCTS.find((p) => p.id === product)?.title;
    const canContinue = [Boolean(product), Boolean(stage), name.trim() !== '' && isEmail(email)][step];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canContinue) return;
        if (step < 2) {
            setStep(step + 1);
            return;
        }
        window.location.href = mailtoHref(`Project enquiry — ${productTitle}`, [
            `Name: ${name.trim()}`,
            `Email: ${email.trim()}`,
            `Product: ${productTitle}`,
            `Stage: ${STAGES.find((s) => s.id === stage)?.label}`,
        ]);
        setSent(true);
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

                {sent ? (
                    <div className="wizard-step">
                        <small>Enquiry ready</small>
                        <h3>Thank you.</h3>
                        <p className="wizard-note">
                            Your email app should open with your enquiry ready to send. If it didn’t, write to us
                            at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                        </p>
                    </div>
                ) : step === 0 ? (
                    <div className="wizard-step">
                        <small>01 / Product</small>
                        <h3>What would move your business forward?</h3>
                        <Choices
                            options={PRODUCTS.map((p) => ({ id: p.id, label: p.title }))}
                            value={product}
                            onChange={setProduct}
                        />
                    </div>
                ) : step === 1 ? (
                    <div className="wizard-step">
                        <small>02 / Stage</small>
                        <h3>Where are you now?</h3>
                        <Choices options={STAGES} value={stage} onChange={setStage} />
                    </div>
                ) : (
                    <div className="wizard-step">
                        <small>03 / Contact</small>
                        <h3>Let’s continue.</h3>
                        <p className="wizard-note">We’ll use these details only to discuss your project.</p>
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
                    </div>
                )}

                <div className="wizard-actions">
                    {sent ? (
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
                            <button type="submit" className="btn" disabled={!canContinue}>
                                {step === 2 ? 'Send enquiry' : 'Continue'} <span>↗</span>
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
