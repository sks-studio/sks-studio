import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PageWipe from './components/PageWipe';
import Preloader from './components/Preloader';
import { WizardProvider } from './components/Wizard';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetail from './pages/ProjectDetail';
import Projects from './pages/Projects';
import Services from './pages/Services';

// The admin (and supabase-js with it) only downloads when someone visits /admin.
const AdminApp = lazy(() => import('./admin/AdminApp'));

function PublicLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    // Fade in `.reveal` elements as they scroll into view — including ones rendered later
    // (e.g. projects loaded from the database), which the MutationObserver picks up.
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        io.unobserve(entry.target);
                    }
                }),
            { threshold: 0.12 },
        );
        const observeNew = () => document.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el));
        observeNew();
        const mo = new MutationObserver(observeNew);
        mo.observe(document.querySelector('main'), { childList: true, subtree: true });
        return () => {
            io.disconnect();
            mo.disconnect();
        };
    }, []);

    return (
        <>
            <Preloader />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <PageWipe />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <WizardProvider>
                <Routes>
                    <Route
                        path="/admin/*"
                        element={
                            <Suspense fallback={<div className="a-loading">Loading admin…</div>}>
                                <AdminApp />
                            </Suspense>
                        }
                    />
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:slug" element={<ProjectDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </WizardProvider>
        </BrowserRouter>
    );
}
