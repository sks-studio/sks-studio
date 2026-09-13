import { PAGES, PRODUCTS } from '../content';
import { usePageTitle } from '../lib/site';
import PageHero from '../components/PageHero';
import SafeImg from '../components/SafeImg';
import { useWizard } from '../components/Wizard';

export default function Projects() {
    usePageTitle('Projects');
    const openWizard = useWizard();
    return (
        <>
            <PageHero {...PAGES.projects} />

            <section className="shell">
                <div className="project-list">
                    {PRODUCTS.map((p) => (
                        <article className="project-row reveal" key={p.id}>
                            <div className="work-card">
                                <SafeImg src={p.image} alt={p.alt} loading="lazy" />
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
        </>
    );
}
