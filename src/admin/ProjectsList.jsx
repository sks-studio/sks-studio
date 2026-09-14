import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listProjects, saveProject } from './data';
import SafeImg from '../components/SafeImg';
import { Empty, ErrorNote, formatDate, PageHead, Panel, useLoad } from './ui';

export default function ProjectsList() {
    const { data, error, loading, reload } = useLoad(listProjects, []);
    const [busyId, setBusyId] = useState(null);
    const [actionError, setActionError] = useState(null);
    const projects = data ?? [];

    const togglePublished = async (project) => {
        setBusyId(project.id);
        setActionError(null);
        try {
            await saveProject({ id: project.id, published: !project.published });
            await reload();
        } catch (err) {
            setActionError(err);
        } finally {
            setBusyId(null);
        }
    };

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Projects' }]}
                title="Projects"
                sub="Post work and offers. Published projects appear on the Projects page, each with its own shareable link."
                actions={
                    <Link className="a-btn a-btn-primary" to="/admin/projects/new">
                        New project
                    </Link>
                }
            />
            <ErrorNote error={error || actionError} />

            <Panel>
                {projects.length === 0 ? (
                    <Empty message={loading ? 'Loading…' : 'Nothing posted yet.'}>
                        {!loading && (
                            <Link className="a-btn a-btn-primary" to="/admin/projects/new">
                                Post your first project
                            </Link>
                        )}
                    </Empty>
                ) : (
                    <div className="a-project-grid">
                        {projects.map((p) => (
                            <article className="a-project" key={p.id}>
                                <Link to={`/admin/projects/${p.id}`} className="a-thumb">
                                    <SafeImg src={p.image_url || undefined} alt="" fallback={<span>No image</span>} />
                                </Link>
                                <div className="a-project-body">
                                    <div className="a-badges">
                                        <span className={`a-badge ${p.published ? 'live' : ''}`}>
                                            {p.published ? 'Published' : 'Draft'}
                                        </span>
                                        {p.featured && <span className="a-badge featured">Featured</span>}
                                        {p.category && <span className="a-badge">{p.category}</span>}
                                    </div>
                                    <h3>
                                        <Link to={`/admin/projects/${p.id}`}>{p.title}</Link>
                                    </h3>
                                    {p.summary && <p>{p.summary}</p>}
                                    <small>Updated {formatDate(p.updated_at)}</small>
                                </div>
                                <div className="a-project-actions">
                                    <Link className="a-btn" to={`/admin/projects/${p.id}`}>
                                        Edit
                                    </Link>
                                    <button className="a-btn" onClick={() => togglePublished(p)} disabled={busyId === p.id}>
                                        {busyId === p.id ? 'Saving…' : p.published ? 'Unpublish' : 'Publish'}
                                    </button>
                                    {p.published && (
                                        <a className="a-btn" href={`/projects/${p.slug}`} target="_blank" rel="noreferrer">
                                            View ↗
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </Panel>
        </>
    );
}
