import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PAGES } from '../content';
import { getPublishedProject } from '../lib/api';
import { usePageTitle } from '../lib/site';
import Closing from '../components/Closing';
import PageHero from '../components/PageHero';
import TransitionLink from '../components/TransitionLink';
import { useWizard } from '../components/Wizard';

export default function ProjectDetail() {
    const { slug } = useParams();
    const openWizard = useWizard();
    const [state, setState] = useState({ loading: true, project: null });

    useEffect(() => {
        let live = true;
        setState({ loading: true, project: null });
        getPublishedProject(slug)
            .then((project) => live && setState({ loading: false, project }))
            .catch(() => live && setState({ loading: false, project: null }));
        return () => {
            live = false;
        };
    }, [slug]);

    const { loading, project } = state;
    usePageTitle(project?.title ?? (loading ? 'Projects' : 'Project not found'));

    if (loading) {
        return (
            <section className="shell not-found">
                <div className="eyebrow">Loading project…</div>
            </section>
        );
    }

    if (!project) {
        return (
            <section className="shell not-found">
                <div className="eyebrow">Projects</div>
                <h1 className="section-title">We couldn’t find that project.</h1>
                <TransitionLink to="/projects" className="btn">
                    All projects <span>↗</span>
                </TransitionLink>
            </section>
        );
    }

    // A blank line in the admin body starts a new paragraph.
    const paragraphs = (project.body || '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <>
            <PageHero
                eyebrow={project.category || 'Project'}
                title={project.title}
                copy={project.summary}
                image={project.image_url || PAGES.projects.image}
                alt={project.title}
                crumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Projects', to: '/projects' },
                    { label: project.title },
                ]}
            />

            <section className="shell project-body reveal">
                <div className="eyebrow">About this project</div>
                <div>
                    {paragraphs.length > 0 ? (
                        paragraphs.map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                        <p>{project.summary}</p>
                    )}
                    <button className="btn" onClick={() => openWizard()}>
                        {project.cta_label || 'Start a project'} <span>↗</span>
                    </button>
                </div>
            </section>

            <Closing />
        </>
    );
}
