import { useWizard } from './Wizard';

export default function Closing() {
    const openWizard = useWizard();
    return (
        <section className="closing" id="contact">
            <div className="closing-card reveal">
                <div className="closing-content">
                    <div className="eyebrow">Remote · South Africa</div>
                    <h2>Build what lasts.</h2>
                    <p>Start with one clear idea.</p>
                    <button className="btn" onClick={() => openWizard()}>
                        Start your project <span>↗</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
