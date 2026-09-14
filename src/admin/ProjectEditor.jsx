import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProject, getProject, saveProject, uploadProjectImage } from './data';
import SafeImg from '../components/SafeImg';
import { ErrorNote, Field, orNull, PageHead, Panel, toForm, useLoad } from './ui';

const EMPTY = {
    title: '',
    slug: '',
    category: '',
    summary: '',
    body: '',
    image_url: '',
    cta_label: 'Start a project',
    published: false,
    featured: false,
    sort_order: 0,
};

export const slugify = (s) =>
    s
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);

export default function ProjectEditor() {
    const { id } = useParams();
    const isNew = !id;
    const navigate = useNavigate();

    const { data, error: loadError, loading } = useLoad(() => (isNew ? Promise.resolve(null) : getProject(id)), [id]);
    const [form, setForm] = useState(EMPTY);
    const [slugEdited, setSlugEdited] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [savedAt, setSavedAt] = useState(null);

    useEffect(() => {
        setForm(data ? { ...EMPTY, ...toForm(data) } : EMPTY);
        setSlugEdited(Boolean(data));
        setSavedAt(null);
    }, [data]);

    const set = (key) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm((f) => {
            const next = { ...f, [key]: value };
            // The link follows the title until someone edits it by hand.
            if (key === 'title' && !slugEdited) next.slug = slugify(value);
            return next;
        });
    };

    const handleSlug = (e) => {
        setSlugEdited(true);
        setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }));
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
            const url = await uploadProjectImage(file);
            setForm((f) => ({ ...f, image_url: url }));
        } catch (err) {
            setError(err);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const slug = slugify(form.slug || form.title);
        if (!slug) {
            setError(new Error('Give the project a title first.'));
            return;
        }
        setSaving(true);
        setError(null);
        const payload = {
            title: form.title.trim(),
            slug,
            category: orNull(form.category),
            summary: orNull(form.summary),
            body: orNull(form.body),
            image_url: orNull(form.image_url),
            cta_label: orNull(form.cta_label),
            published: form.published,
            featured: form.featured,
            sort_order: Number(form.sort_order) || 0,
        };
        try {
            if (isNew) {
                const created = await saveProject(payload);
                navigate(`/admin/projects/${created.id}`, { replace: true });
            } else {
                await saveProject({ id, ...payload });
                setForm((f) => ({ ...f, slug }));
                setSavedAt(new Date());
            }
        } catch (err) {
            setError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Delete “${form.title || 'this project'}”? This can’t be undone.`)) return;
        try {
            await deleteProject(id);
            navigate('/admin/projects');
        } catch (err) {
            setError(err);
        }
    };

    const title = isNew ? 'New project' : form.title || 'Project';
    const liveUrl = `/projects/${slugify(form.slug || form.title) || '…'}`;

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Projects', to: '/admin/projects' }, { label: title }]}
                title={title}
                sub={isNew ? 'Post a project or offer to advertise on the site.' : `Link: ${liveUrl}`}
                actions={
                    !isNew &&
                    data?.published && (
                        <a className="a-btn" href={liveUrl} target="_blank" rel="noreferrer">
                            View on site ↗
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
                        <Panel title="Post">
                            <div className="a-form">
                                <Field label="Title" wide>
                                    <input className="a-input" required value={form.title} onChange={set('title')} />
                                </Field>
                                <Field label="Link" hint={`Shareable page: ${liveUrl}`}>
                                    <input className="a-input" value={form.slug} onChange={handleSlug} />
                                </Field>
                                <Field label="Category" hint="e.g. Online store, Case study, Offer">
                                    <input className="a-input" value={form.category} onChange={set('category')} />
                                </Field>
                                <Field label="Summary" hint="One or two sentences, shown on the project card." wide>
                                    <textarea
                                        className="a-input"
                                        rows="3"
                                        maxLength={280}
                                        value={form.summary}
                                        onChange={set('summary')}
                                    />
                                </Field>
                                <Field label="Full description" hint="Leave a blank line to start a new paragraph." wide>
                                    <textarea className="a-input" rows="10" value={form.body} onChange={set('body')} />
                                </Field>
                                <Field label="Button text" hint="Opens the project wizard.">
                                    <input className="a-input" value={form.cta_label} onChange={set('cta_label')} />
                                </Field>
                            </div>
                        </Panel>

                        <div className="a-stack">
                            <Panel title="Image">
                                <div className="a-thumb a-thumb-lg">
                                    <SafeImg
                                        src={form.image_url || undefined}
                                        alt=""
                                        fallback={<span>{form.image_url ? 'Image can’t be loaded' : 'No image yet'}</span>}
                                        key={form.image_url}
                                    />
                                </div>
                                <div className="a-form a-mt">
                                    <Field label="Upload" hint="JPEG, PNG, WebP or GIF, up to 5 MB." wide>
                                        <input
                                            className="a-input"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={handleUpload}
                                            disabled={uploading}
                                        />
                                    </Field>
                                    <Field label="…or image URL" wide>
                                        <input className="a-input" type="url" value={form.image_url} onChange={set('image_url')} />
                                    </Field>
                                    {uploading && <p className="a-saved">Uploading…</p>}
                                </div>
                            </Panel>

                            <Panel title="Visibility">
                                <div className="a-form">
                                    <label className="a-check a-wide">
                                        <input type="checkbox" checked={form.published} onChange={set('published')} />
                                        Published — visible on the site
                                    </label>
                                    <label className="a-check a-wide">
                                        <input type="checkbox" checked={form.featured} onChange={set('featured')} />
                                        Featured — shown first
                                    </label>
                                    <Field label="Order" hint="Lower numbers show first.">
                                        <input
                                            className="a-input"
                                            type="number"
                                            value={form.sort_order}
                                            onChange={set('sort_order')}
                                        />
                                    </Field>
                                </div>
                            </Panel>
                        </div>

                        <div className="a-savebar a-wide">
                            {!isNew && (
                                <button type="button" className="a-btn a-btn-danger" onClick={handleDelete}>
                                    Delete project
                                </button>
                            )}
                            <span className="a-saved" role="status">
                                {savedAt &&
                                    `Saved at ${savedAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}`}
                            </span>
                            <button className="a-btn a-btn-primary" disabled={saving || uploading}>
                                {saving ? 'Saving…' : isNew ? 'Create project' : 'Save changes'}
                            </button>
                        </div>
                    </form>
                )
            )}
        </>
    );
}
