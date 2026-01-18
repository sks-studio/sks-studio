import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--glass-border)',
            marginTop: '80px',
            padding: '60px 0',
            background: 'rgba(0,0,0,0.2)'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>

                    {/* Brand Column */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                            <span className="text-gradient">SKS Net</span> Pty Ltd
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>
                            Discover a world of possibilities. Welcome to a world of limitless possibilities, where the journey is as exhilarating as the destination.
                        </p>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                            Designed with WordPress by Sir Karabo Studio Network
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Visit Us</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                            123 Example Street<br />
                            San Francisco, CA 12345
                        </p>
                        <h3 style={{ fontSize: '1.2rem', margin: '20px 0 10px', color: 'white' }}>Hours</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Monday—Friday<br />
                            9am-5pm
                        </p>
                    </div>

                    {/* Social/Phone Column */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'white' }}>Contact</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                            (123) 456-7890
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Facebook</Link>
                            <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Twitter</Link>
                            <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>WordPress</Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
