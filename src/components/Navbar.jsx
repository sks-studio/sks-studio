 import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Consulting', path: '/consult' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            zIndex: 100,
            padding: '1rem 2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <span className="text-gradient">Karabo</span>.IT
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                textDecoration: 'none',
                                color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.6)',
                                fontWeight: location.pathname === link.path ? '600' : '400',
                                transition: 'color 0.3s'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: 'white' }}>
                    {isOpen ? <X /> : <Menu />}
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            overflow: 'hidden',
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            paddingTop: '20px'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.6)',
                                    fontSize: '1.1rem',
                                    textAlign: 'center'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
