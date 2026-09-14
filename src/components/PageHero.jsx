import Breadcrumbs from './Breadcrumbs';
import Lines from './Lines';
import Parallax from './Parallax';
import SafeImg from './SafeImg';

// `crumb` is the current page's label (gives Home / crumb); pass `crumbs` for a deeper trail.
export default function PageHero({ eyebrow, title, copy, image, alt, crumb, crumbs }) {
    const trail = crumbs ?? (crumb ? [{ label: 'Home', to: '/' }, { label: crumb }] : null);

    return (
        <section className="page-hero">
            <div className="page-stage">
                <Parallax speed={0.12}>
                    <SafeImg className="hero-image active" src={image} alt={alt} />
                </Parallax>
                <div className="hero-shade" />
                <div className="page-content">
                    {trail && <Breadcrumbs items={trail} />}
                    <div className="hero-kicker">{eyebrow}</div>
                    <h1>
                        <Lines text={title} />
                    </h1>
                    {copy && <p className="hero-copy">{copy}</p>}
                </div>
            </div>
        </section>
    );
}
