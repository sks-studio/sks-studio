import React from 'react';
import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            {/* Hero Section */}
            <section style={{ textAlign: 'center', marginBottom: '80px' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: 1.1 }}
                >
                    Elevate Your <br />
                    <span className="text-gradient">Digital Presence</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 40px' }}
                >
                    Expert IT consulting, 3D web experiences, and scalable software architectures tailored for your business needs.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/consult" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Start a Project <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <ServiceCard
                    icon={<Globe size={40} color="#00c3ff" />}
                    title="Web Development"
                    description="Immersive glassmorphism and 3D websites that capture user attention and engagement."
                />
                <ServiceCard
                    icon={<Database size={40} color="#7000ff" />}
                    title="System Architecture"
                    description="Scalable backend solutions and cloud infrastructure design for enterprise growth."
                />
                <ServiceCard
                    icon={<Code size={40} color="#ff0055" />}
                    title="Custom Software"
                    description="Tailor-made software solutions to streamline your business operations and workflows."
                />
            </section>
        </div>
    );
};

const ServiceCard = ({ icon, title, description }) => (
    <motion.div
        className="glass-card"
        style={{ padding: '30px' }}
        whileHover={{ y: -10 }}
    >
        <div style={{ marginBottom: '20px' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{description}</p>
    </motion.div>
);

export default Home;
