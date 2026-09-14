import { LOGO } from '../content';
import SafeImg from './SafeImg';

// Navy panel with the SKS logo that covers the page while TransitionLink changes route.
export default function PageWipe() {
    return (
        <div className="page-wipe" aria-hidden="true">
            <div className="page-wipe-mark">
                <SafeImg src={LOGO} fallback={<span className="brand-fallback">SKS</span>} />
            </div>
            <span className="page-wipe-name">SKS STUDIO</span>
        </div>
    );
}
