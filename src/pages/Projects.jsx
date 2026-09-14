import { useEffect, useState } from 'react';
import { PAGES, PRODUCTS } from '../content';
import { listPublishedProjects } from '../lib/api';
import { usePageTitle } from '../lib/site';
import PageHero from '../components/PageHero';
import Parallax from '../components/Parallax';
import SafeImg from '../components/SafeImg';
import TransitionLink from '../components/TransitionLink';
import { useWizard } from '../components/Wizard';

export default function Projects() {
    usePageTitle('Projects');
    const openWizard = useWizard();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let live = true;
        listPublishedProjects()
            .then((rows) => live && setPosts(rows))
            .catch(() => {}); // the products below still render if the database is unreachable
        return () => {
            live = false;
        };
    }, []);

    return (
        <>
            <PageHero {...PAGES.projects} />

            <section className="shell">
                <div className="project-list">
                    {PRODUCTS.map((p) => (
                        <article className="project-row reveal" key={p.id}>
                            <div className="work-card">
                                <Parallax speed={0.06}>
                                    <SafeImg src={p.image} alt={p.alt} loading="lazy" />
                                </Parallax>
                            </div>
                            <div className="project-copy">
                                <span className="num">{p.no}</span>
                                <h3>{p.title}</h3>
                                <p>{p.text}</p>
                                <button className="btn" onClick={() => openWizard(p.id)}>
                                    {p.cta} <span>↗</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {posts.length > 0 && (
                <section className="work">
                    <div className="shell">
                        <div className="section-head reveal">
                            <div>
                                <div className="eyebrow">Latest projects</div>
                                <h2 className="section-title">Recent work.</h2>
                            </div>
                            <p>Work we’ve launched and offers you can start today.</p>
                        </div>
                        <div className="post-grid">
                            {posts.map((post) => (
                                <TransitionLink
                                    key={post.id}
                                    to={`/projects/${post.slug}`}
                                    className="work-card post-card reveal"
                                >
                                    <Parallax speed={0.05}>
                                        <SafeImg src={post.image_url} alt="" loading="lazy" />
                                    </Parallax>
                                    <div className="work-label">
                                        <div>
                                            <small>{post.category || 'Project'}</small>
                                            <h3>{post.title}</h3>
                                            {post.summary && <p>{post.summary}</p>}
                                        </div>
                                        <span aria-hidden="true">↗</span>
                                    </div>
                                </TransitionLink>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
