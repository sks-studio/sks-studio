import React from 'react';
import { Download, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Consulting = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '40px', textAlign: 'center' }}>Consulting <span className="text-gradient">Services</span></h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {/* Rate Card Section */}
                    <motion.div
                        className="glass-panel"
                        style={{ padding: '30px' }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h2 style={{ marginBottom: '20px' }}>Rate Card</h2>
                        <p style={{ marginBottom: '20px', color: 'var(--color-text-muted)' }}>
                            Download my standard rate card for hourly consulting, project-based work, and retainers.
                        </p>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Download size={18} /> Download PDF
                        </button>

                        <div style={{ marginTop: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Quick Rates</h3>
                            <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)' }}>
                                <li style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Consultation</span> <span style={{ color: '#fff' }}>$150/hr</span>
                                </li>
                                <li style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Development</span> <span style={{ color: '#fff' }}>$100/hr</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>System Design</span> <span style={{ color: '#fff' }}>Project Basis</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="glass-panel"
                        style={{ padding: '30px' }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h2 style={{ marginBottom: '20px' }}>Get in Touch</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Project Name</label>
                                <input type="text" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Email</label>
                                <input type="email" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Details</label>
                                <textarea rows="4" style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}></textarea>
                            </div>

                            <button type="button" className="btn-primary" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                Send Request <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Consulting;
