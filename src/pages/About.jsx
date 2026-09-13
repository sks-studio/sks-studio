import { PAGES, VALUES } from '../content';
import { usePageTitle } from '../lib/site';
import Closing from '../components/Closing';
import PageHero from '../components/PageHero';

export default function About() {
    usePageTitle('About');
    return (
        <>
            <PageHero {...PAGES.about} />

            <section className="intro shell reveal">
                <div className="eyebrow">Our purpose</div>
                <div>
                    <h2>Technology should build wealth—not confusion.</h2>
                    <p className="intro-copy">
                        SKS Studio gives ambitious business owners a direct path from idea to a system they own. We
                        combine design, business thinking and software development in one focused partnership.
                    </p>
                </div>
            </section>

            <section className="shell section-tight">
                <div className="value-grid">
                    {VALUES.map((v) => (
                        <article className="value-card reveal" key={v.no}>
                            <span className="num">{v.no}</span>
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <Closing />
        </>
    );
}
