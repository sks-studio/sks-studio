import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Preloader from './components/Preloader';
import { WizardProvider } from './components/Wizard';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import Services from './pages/Services';

function Layout() {
    const { pathname } = useLocation();

    // On every route: jump to top, then fade in `.reveal` elements as they scroll into view.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
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
        document.querySelectorAll('.reveal:not(.visible)').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [pathname]);

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <WizardProvider>
                <Preloader />
                <Layout />
            </WizardProvider>
        </BrowserRouter>
    );
}
