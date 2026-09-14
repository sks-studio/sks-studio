import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BUDGETS, CONTACT_METHODS, INDUSTRIES, PRODUCTS, STAGES, TEAM_SIZES, TIMELINES } from '../content';
import { addClient, deleteClient, getClient, updateClient } from './data';
import { CLIENT_STATUSES, ErrorNote, Field, formatDate, orNull, PageHead, Panel, toForm, useLoad } from './ui';

const LIST_FIELDS = ['services', 'features', 'goals'];

const EMPTY = {
    name: '',
    email: '',
    phone: '',
    company: '',
    contact_method: '',
    subject: '',
    product: '',
    stage: '',
    industry: '',
    team_size: '',
    budget: '',
    timeline: '',
    services: '',
    features: '',
    goals: '',
    message: '',
    status: 'new',
    value: '',
    notes: '',
};

// Database arrays are edited as comma-separated text.
const fromRow = (row) => {
    const form = { ...EMPTY, ...toForm(row) };
    LIST_FIELDS.forEach((key) => {
        form[key] = (row[key] ?? []).join(', ');
    });
    return form;
};
const toList = (text) =>
    text
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

function Select({ value, onChange, options }) {
    const list = value && !options.includes(value) ? [value, ...options] : options;
    return (
        <select className="a-input" value={value} onChange={onChange}>
            <option value="">—</option>
            {list.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    );
}

export default function ClientDetail() {
    const { id } = useParams();
    const isNew = !id;
    const navigate = useNavigate();

    const { data, error: loadError, loading } = useLoad(() => (isNew ? Promise.resolve(null) : getClient(id)), [id]);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [savedAt, setSavedAt] = useState(null);

    useEffect(() => {
        setForm(data ? fromRow(data) : EMPTY);
        setSavedAt(null);
    }, [data]);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: orNull(form.phone),
            company: orNull(form.company),
            contact_method: orNull(form.contact_method),
            subject: orNull(form.subject),
            product: orNull(form.product),
            stage: orNull(form.stage),
            industry: orNull(form.industry),
            team_size: orNull(form.team_size),
            budget: orNull(form.budget),
            timeline: orNull(form.timeline),
            services: toList(form.services),
            features: toList(form.features),
            goals: toList(form.goals),
            message: orNull(form.message),
            status: form.status,
            value: form.value === '' ? null : Number(form.value),
            notes: orNull(form.notes),
        };
        try {
            if (isNew) {
                const created = await addClient({ ...payload, source: 'admin' });
                navigate(`/admin/clients/${created.id}`, { replace: true });
            } else {
                await updateClient(id, payload);
                setSavedAt(new Date());
            }
        } catch (err) {
            setError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Delete ${form.name || 'this client'}? This can’t be undone.`)) return;
        try {
            await deleteClient(id);
            navigate('/admin/clients');
        } catch (err) {
            setError(err);
        }
    };

    const title = isNew ? 'Add client' : form.name || 'Client';
    const origin =
        data &&
        (data.source === 'admin' ? 'Added by staff' : data.source === 'wizard' ? 'From the project wizard' : 'From the contact form');

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Clients', to: '/admin/clients' }, { label: title }]}
                title={title}
                sub={isNew ? 'Add a client you met outside the website.' : data && `${origin} · ${formatDate(data.created_at)}`}
                actions={
                    !isNew &&
                    form.email && (
                        <a className="a-btn" href={`mailto:${form.email}`}>
                            Email client
                        </a>
                    )
                }
            />
            <ErrorNote error={loadError || error} />

            {!isNew && loading && !data ? (
                <Panel>
                    <p className="a-empty">Loading…</p>
                </Panel>
            ) : (
                !loadError && (
                    <form className="a-grid-2" onSubmit={handleSave}>
                        <div className="a-stack">
                            <Panel title="Contact">
                                <div className="a-form">
                                    <Field label="Name">
                                        <input className="a-input" required value={form.name} onChange={set('name')} />
                                    </Field>
                                    <Field label="Email">
                                        <input className="a-input" type="email" required value={form.email} onChange={set('email')} />
                                    </Field>
                                    <Field label="Phone">
                                        <input className="a-input" type="tel" value={form.phone} onChange={set('phone')} />
                                    </Field>
                                    <Field label="Company">
                                        <input className="a-input" value={form.company} onChange={set('company')} />
                                    </Field>
                                    <Field label="Prefers">
                                        <Select value={form.contact_method} onChange={set('contact_method')} options={CONTACT_METHODS} />
                                    </Field>
                                    <Field label="Subject">
                                        <input className="a-input" value={form.subject} onChange={set('subject')} />
                                    </Field>
                                    <Field label="Their message" wide>
                                        <textarea className="a-input" rows="4" value={form.message} onChange={set('message')} />
                                    </Field>
                                </div>
                            </Panel>

                            <Panel title="Pipeline">
                                <div className="a-form">
                                    <Field label="Status">
                                        <select className="a-input" value={form.status} onChange={set('status')}>
                                            {CLIENT_STATUSES.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field label="Deal value (ZAR)">
                                        <input
                                            className="a-input"
                                            type="number"
                                            min="0"
                                            step="100"
                                            value={form.value}
                                            onChange={set('value')}
                                        />
                                    </Field>
                                    <Field label="Internal notes" hint="Only staff can see these." wide>
                                        <textarea className="a-input" rows="5" value={form.notes} onChange={set('notes')} />
                                    </Field>
                                </div>
                            </Panel>
                        </div>

                        <Panel title="Brief" sub="What they told us in the wizard — editable.">
                            <div className="a-form">
                                <Field label="Product">
                                    <Select value={form.product} onChange={set('product')} options={PRODUCTS.map((p) => p.title)} />
                                </Field>
                                <Field label="Stage">
                                    <Select value={form.stage} onChange={set('stage')} options={STAGES.map((s) => s.label)} />
                                </Field>
                                <Field label="Industry">
                                    <Select value={form.industry} onChange={set('industry')} options={INDUSTRIES} />
                                </Field>
                                <Field label="Team size">
                                    <Select value={form.team_size} onChange={set('team_size')} options={TEAM_SIZES} />
                                </Field>
                                <Field label="Budget">
                                    <Select value={form.budget} onChange={set('budget')} options={BUDGETS} />
                                </Field>
                                <Field label="Timeline">
                                    <Select value={form.timeline} onChange={set('timeline')} options={TIMELINES} />
                                </Field>
                                <Field label="Features" hint="Separate with commas." wide>
                                    <textarea className="a-input" rows="2" value={form.features} onChange={set('features')} />
                                </Field>
                                <Field label="Services" hint="Separate with commas." wide>
                                    <textarea className="a-input" rows="2" value={form.services} onChange={set('services')} />
                                </Field>
                                <Field label="Goals" hint="Separate with commas." wide>
                                    <textarea className="a-input" rows="2" value={form.goals} onChange={set('goals')} />
                                </Field>
                            </div>
                        </Panel>

                        <div className="a-savebar a-wide">
                            {!isNew && (
                                <button type="button" className="a-btn a-btn-danger" onClick={handleDelete}>
                                    Delete client
                                </button>
                            )}
                            <span className="a-saved" role="status">
                                {savedAt &&
                                    `Saved at ${savedAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}`}
                            </span>
                            <button className="a-btn a-btn-primary" disabled={saving}>
                                {saving ? 'Saving…' : isNew ? 'Add client' : 'Save changes'}
                            </button>
                        </div>
                    </form>
                )
            )}
        </>
    );
}
