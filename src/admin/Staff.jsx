import { useState } from 'react';
import { deleteStaff, listStaff, saveStaff } from './data';
import { Empty, ErrorNote, Field, orNull, PageHead, Panel, ROLE_LABELS, toForm, useAdmin, useLoad } from './ui';

const EMPTY = { name: '', email: '', title: '', phone: '', role: 'staff', active: true };

export default function Staff() {
    const { role, email: myEmail } = useAdmin();
    const canEdit = role === 'superadmin' || role === 'demo';
    const { data, error, loading, reload } = useLoad(listStaff, []);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null); // original email of the row being edited
    const [saving, setSaving] = useState(false);
    const [actionError, setActionError] = useState(null);
    const team = data ?? [];

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const reset = () => {
        setEditing(null);
        setForm(EMPTY);
    };

    const startEdit = (member) => {
        setEditing(member.email);
        setForm({ ...EMPTY, ...toForm(member) });
        setActionError(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setActionError(null);
        try {
            await saveStaff(
                {
                    name: form.name.trim(),
                    email: form.email,
                    title: orNull(form.title),
                    phone: orNull(form.phone),
                    role: form.role,
                    active: form.active,
                },
                editing,
            );
            reset();
            await reload();
        } catch (err) {
            setActionError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async (member) => {
        if (!window.confirm(`Remove ${member.name} from staff? They’ll lose admin access.`)) return;
        setActionError(null);
        try {
            await deleteStaff(member.email);
            if (editing === member.email) reset();
            await reload();
        } catch (err) {
            setActionError(err);
        }
    };

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Staff' }]}
                title="Staff"
                sub="Who can use the admin, and what they’re allowed to do."
            />
            <ErrorNote error={error || actionError} />

            <div className="a-grid-2">
                <Panel title="Team" sub={`${team.filter((m) => m.active).length} active of ${team.length}`}>
                    {team.length === 0 ? (
                        <Empty message={loading ? 'Loading…' : 'No staff yet.'} />
                    ) : (
                        <div className="a-table-wrap">
                            <table className="a-table a-table-static">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        {canEdit && <th aria-label="Actions" />}
                                    </tr>
                                </thead>
                                <tbody>
                                    {team.map((m) => (
                                        <tr key={m.email}>
                                            <td>
                                                <span className="a-strong">{m.name}</span>
                                                <small>
                                                    {[m.title, m.email].filter(Boolean).join(' · ')}
                                                    {m.email === myEmail && ' (you)'}
                                                </small>
                                            </td>
                                            <td>
                                                <span className={`a-badge a-role-${m.role}`}>{ROLE_LABELS[m.role]}</span>
                                            </td>
                                            <td>
                                                <span className={`a-badge ${m.active ? 'live' : ''}`}>
                                                    {m.active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            {canEdit && (
                                                <td className="a-row-actions">
                                                    <button className="a-btn" onClick={() => startEdit(m)}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="a-btn a-btn-danger"
                                                        onClick={() => handleRemove(m)}
                                                        disabled={m.email === myEmail}
                                                        title={m.email === myEmail ? 'You can’t remove yourself' : undefined}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Panel>

                <div className="a-stack">
                    {canEdit ? (
                        <Panel title={editing ? 'Edit staff member' : 'Add staff member'}>
                            <form className="a-form" onSubmit={handleSave}>
                                <Field label="Name">
                                    <input className="a-input" required value={form.name} onChange={set('name')} />
                                </Field>
                                <Field label="Email">
                                    <input className="a-input" type="email" required value={form.email} onChange={set('email')} />
                                </Field>
                                <Field label="Job title">
                                    <input className="a-input" value={form.title} onChange={set('title')} />
                                </Field>
                                <Field label="Phone">
                                    <input className="a-input" type="tel" value={form.phone} onChange={set('phone')} />
                                </Field>
                                <Field label="Role">
                                    <select className="a-input" value={form.role} onChange={set('role')}>
                                        <option value="staff">Staff</option>
                                        <option value="superadmin">Superadmin</option>
                                    </select>
                                </Field>
                                <label className="a-check">
                                    <input type="checkbox" checked={form.active} onChange={set('active')} />
                                    Active — can sign in to the admin
                                </label>
                                <div className="a-form-actions a-wide">
                                    {editing && (
                                        <button type="button" className="a-btn" onClick={reset}>
                                            Cancel
                                        </button>
                                    )}
                                    <button className="a-btn a-btn-primary" disabled={saving}>
                                        {saving ? 'Saving…' : editing ? 'Save changes' : 'Add to staff'}
                                    </button>
                                </div>
                            </form>
                        </Panel>
                    ) : (
                        <Panel title="Managing staff">
                            <p className="a-muted">Only a superadmin can add or change staff.</p>
                        </Panel>
                    )}

                    <Panel title="Roles">
                        <dl className="a-roles">
                            <dt>Superadmin</dt>
                            <dd>Everything: clients, projects and managing staff.</dd>
                            <dt>Staff</dt>
                            <dd>Clients and projects. Can see the team but not change it.</dd>
                        </dl>
                        <p className="a-muted a-mt">
                            Adding someone here grants access to their email. They also need a login: in Supabase,
                            open <b>Authentication → Users → Invite user</b> with the same email.
                        </p>
                    </Panel>
                </div>
            </div>
        </>
    );
}
