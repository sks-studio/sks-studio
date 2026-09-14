import { useEffect, useState } from 'react';
import { HERO_SLIDES, PRINCIPLES, PRODUCTS, SERVICES } from '../content';
import { prefersReducedMotion, usePageTitle } from '../lib/site';
import Closing from '../components/Closing';
import MethodList from '../components/MethodList';
import Parallax from '../components/Parallax';
import SafeImg from '../components/SafeImg';
import TransitionLink from '../components/TransitionLink';
import { useWizard } from '../components/Wizard';

const SLIDE_MS = 6000;
const pad = (n) => String(n).padStart(2, '0');

export default function Home() {
    usePageTitle(null);
    const openWizard = useWizard();
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <section className="hero" id="home">
                <div className="hero-stage">
                    <Parallax speed={0.15}>
                        {HERO_SLIDES.map((img, i) => (
                            <SafeImg
                                key={img.src}
                                className={`hero-image${i === slide ? ' active' : ''}`}
                                src={img.src}
                                alt={img.alt}
                            />
                        ))}
                    </Parallax>
                    <div className="hero-shade" />
                    <span className="slide-no">
                        {pad(slide + 1)} / {pad(HERO_SLIDES.length)}
                    </span>
                    <div className="hero-content">
                        <div className="hero-kicker">Business software · South Africa</div>
                        <h1>
                            Business systems.
                            <br />
                            Built around you.
                        </h1>
                        <div className="hero-bottom">
                            <p className="hero-copy">Sell more. Serve better. Run everything in one place.</p>
                            <div className="hero-wizard glass">
                                <small>Start here</small>
                                <strong>Choose what your business needs.</strong>
                                <div className="progress">
                                    <i />
                                    <i />
                                    <i />
                                </div>
                                <button className="btn" onClick={() => openWizard()}>
                                    Start the wizard <span>↗</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="intro shell reveal" id="about">
                <div className="eyebrow">The studio</div>
                <div>
                    <h2>We make complex software feel simple.</h2>
                    <p className="intro-copy">One business. One useful product. One clear path from idea to launch.</p>
                </div>
                <div className="principles">
                    {PRINCIPLES.map((p) => (
                        <div className="principle" key={p.title}>
                            <b>{p.title}</b>
                            <span>{p.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="work" id="projects">
                <div className="shell">
                    <div className="section-head reveal">
                        <div>
                            <div className="eyebrow">Products</div>
                            <h2 className="section-title">Built for growth.</h2>
                        </div>
                        <p>Premium digital products with a clear business purpose.</p>
                    </div>
                    <div className="work-grid">
                        {PRODUCTS.map((p) => (
                            <TransitionLink to="/projects" className="work-card reveal" key={p.id}>
                                <Parallax speed={0.06}>
                                    <SafeImg src={p.image} alt={p.alt} loading="lazy" />
                                </Parallax>
                                <div className="work-label">
                                    <div>
                                        <small>Product {p.no}</small>
                                        <h3>{p.title}</h3>
                                    </div>
                                    <span aria-hidden="true">↗</span>
                                </div>
                            </TransitionLink>
                        ))}
                    </div>
                </div>
            </section>

            <section className="method" id="method">
                <div className="shell">
                    <div className="section-head reveal">
                        <div>
                            <div className="eyebrow">Our method</div>
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

            <section className="services shell" id="services">
                <div className="services-layout">
                    <div className="reveal">
                        <div className="eyebrow">Services</div>
                        <h2 className="section-title">
                            One system.
                            <br />
                            Seven spaces.
                        </h2>
                    </div>
                    <div className="service-list reveal">
                        {SERVICES.map((s, i) => (
                            <details className="service" key={s.no} open={i === 0}>
                                <summary>
                                    <span className="num">{s.no}</span>
                                    <h3>{s.title}</h3>
                                    <span className="plus" aria-hidden="true">
                                        +
                                    </span>
                                </summary>
                                <div className="service-body">
                                    <p>{s.text}</p>
                                    <div className="chips">
                                        {s.chips.map((chip) => (
                                            <span key={chip}>{chip}</span>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <Closing />
        </>
    );
}
