import Lines from './Lines';
import SafeImg from './SafeImg';

export default function PageHero({ eyebrow, title, copy, image, alt }) {
    return (
        <section className="page-hero">
            <div className="page-stage">
                <SafeImg className="hero-image active" src={image} alt={alt} />
                <div className="hero-shade" />
                <div className="page-content">
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
