import { PAGES, SERVICES } from '../content';
import { usePageTitle } from '../lib/site';
import Closing from '../components/Closing';
import MethodList from '../components/MethodList';
import PageHero from '../components/PageHero';

export default function Services() {
    usePageTitle('Services');
    return (
        <>
            <PageHero {...PAGES.services} />

            <section className="shell">
                <div className="service-grid">
                    {SERVICES.map((s) => (
                        <article className="service-card reveal" key={s.no}>
                            <span className="num">{s.no}</span>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                            <div className="chips">
                                {s.chips.map((chip) => (
                                    <span key={chip}>{chip}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="method">
                <div className="shell">
                    <div className="section-head reveal">
                        <div>
                            <div className="eyebrow">How it works</div>
                            <h2 className="section-title">
                                From idea.
                                <br />
                                To sales.
                            </h2>
                        </div>
                        <p>Three clear steps. Nothing extra.</p>
                    </div>
                    <MethodList />
                </div>
            </section>

            <Closing />
        </>
    );
}
