import React from 'react';
import { ArrowRight, Cloud, Code, Palette, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            {/* Hero Section */}
            <section style={{ textAlign: 'center', marginBottom: '100px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-secondary)' }}>
                        SKS Net Pty Ltd
                    </div>
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '30px', lineHeight: 1.1 }}>
                        Hello <span className="text-gradient">Universe.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto 50px', lineHeight: '1.6' }}
                >
                    "We empower brands and businesses to operate smarter, scale faster, and stand out online."
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/consult" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', padding: '15px 30px' }}>
                        Book a Consultation <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section style={{ marginBottom: '100px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>Our <span className="text-gradient">Expertise</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    <ServiceCard
                        icon={<Zap size={40} color="#ffaa00" />}
                        title="ASSISTANCE"
                        subtitle="Business Assistance"
                        description="Expertise to help you navigate the digital economy."
                        action="Book a Consultation"
                    />
                    <ServiceCard
                        icon={<Palette size={40} color="#ff0055" />}
                        title="BRANDING"
                        subtitle="Business Branding"
                        description="Create a visual and verbal identity that converts."
                        action="Book A Brand Audit"
                    />
                    <ServiceCard
                        icon={<Cloud size={40} color="#00c3ff" />}
                        title="CLOUD"
                        subtitle="Business Hosting"
                        description="A secure & reliable infrastructure tailored for business."
                        action="Explore Hosting"
                    />
                    <ServiceCard
                        icon={<Code size={40} color="#7000ff" />}
                        title="DEVELOPMENT"
                        subtitle="Business Online"
                        description="Build your online presence with clean, high-performance code."
                        action="Build an Application"
                    />
                </div>
            </section>

            {/* Team Section */}
            <section style={{ marginBottom: '100px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>The <span className="text-gradient">Team</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
                    <TeamCard role="SALES" name="Ms Rene Fourie" category="Business Assistance" />
                    <TeamCard role="MEDIA" name="Ms Thatohatsi Moimane" category="Business Branding" />
                    <TeamCard role="MARKETING" name="Ms Bonnie" category="Business Hosting" />
                    <TeamCard role="DEVELOPMENT" name="Mr Laighton Venter" category="Business Online" />
                </div>
            </section>

            {/* Blog Section */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>The <span className="text-gradient">Blog</span></h2>
                        <p style={{ maxWidth: '600px', color: 'var(--color-text-muted)' }}>
                            A proudly South African bespoke Business to Customer IT Hub designed to simplify and accelerate growth online.
                        </p>
                    </div>
                    <Link to="#" style={{ color: 'var(--color-secondary)', textDecoration: 'none' }}>View all posts →</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    <BlogRow title="How African SMEs Can Start Leveraging AI & ML Today" date="July 11, 2025" icon="🌐" />
                    <BlogRow title="The Role of AI in Modern Customer Service" date="July 11, 2025" icon="🚀" />
                    <BlogRow title="The Real Cost of Not Having IT Support in Your Business" date="July 10, 2025" icon="🤖" />
                    <BlogRow title="How to Create a Brand That Converts" date="July 10, 2025" icon="🎬" />
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ icon, title, subtitle, description, action }) => (
    <motion.div
        className="glass-card"
        style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '100%' }}
        whileHover={{ y: -10 }}
    >
        <div style={{ marginBottom: '20px' }}>{icon}</div>
        <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: '5px' }}>{title}</div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{subtitle}</h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', flex: 1, marginBottom: '20px' }}>{description}</p>
        <div style={{ color: 'var(--color-secondary)', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>
            {action} →
        </div>
    </motion.div>
);

const TeamCard = ({ role, name, category }) => (
    <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', margin: '0 auto 20px' }}></div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', letterSpacing: '1px', marginBottom: '5px' }}>{role}</div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{name}</h3>
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{category}</div>
    </div>
);

const BlogRow = ({ title, date, icon }) => (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
        <div style={{ fontSize: '2rem' }}>{icon}</div>
        <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{title}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{date}</div>
        </div>
        <ArrowRight size={16} color="var(--color-text-muted)" />
    </div>
);

export default Home;
