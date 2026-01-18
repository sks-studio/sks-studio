import React, { useState } from 'react';
import { Download, Calendar, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Consulting = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState(1);

    const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];
    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>Consulting <span className="text-gradient">& Appointments</span></h1>
                <p style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--color-text-muted)' }}>
                    Schedule a session with our experts or download rate cards for long-term engagements.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>

                    {/* Booking Utility */}
                    <div className="glass-panel" style={{ padding: '30px', minHeight: '500px' }}>
                        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar color="#00c3ff" /> Book a Session
                        </h2>

                        {step === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p style={{ marginBottom: '20px' }}>Select a date for your consultation:</p>
                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px' }}>
                                    {dates.map((date, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedDate(date)}
                                            style={{
                                                minWidth: '80px',
                                                padding: '15px',
                                                borderRadius: '10px',
                                                background: selectedDate === date ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                border: '1px solid var(--glass-border)'
                                            }}
                                        >
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{date.getDate()}</div>
                                        </div>
                                    ))}
                                </div>

                                {selectedDate && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <p style={{ marginBottom: '20px' }}>Select a time:</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '15px' }}>
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        background: selectedTime === time ? 'var(--color-secondary)' : 'rgba(255,255,255,0.05)',
                                                        border: 'none',
                                                        color: 'white',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div style={{ marginTop: '40px', textAlign: 'right' }}>
                                    <button
                                        disabled={!selectedDate || !selectedTime}
                                        className="btn-primary"
                                        onClick={() => setStep(2)}
                                        style={{ opacity: (!selectedDate || !selectedTime) ? 0.5 : 1, cursor: (!selectedDate || !selectedTime) ? 'not-allowed' : 'pointer' }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <p style={{ marginBottom: '20px' }}>Your Details:</p>
                                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                                    <input required type="text" placeholder="Name" style={{ width: '100%', padding: '15px', marginBottom: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white' }} />
                                    <input required type="email" placeholder="Email" style={{ width: '100%', padding: '15px', marginBottom: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white' }} />
                                    <textarea placeholder="Project Brief / specific questions" rows="4" style={{ width: '100%', padding: '15px', marginBottom: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white' }}></textarea>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                                        <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
                                        <button type="submit" className="btn-primary">Confirm Booking</button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                                <CheckCircle size={60} color="#00ff64" style={{ marginBottom: '20px' }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Booking Confirmed!</h3>
                                <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>
                                    You are scheduled for {selectedDate?.toLocaleDateString()} at {selectedTime}.<br />
                                    A calendar invite has been sent to your email.
                                </p>
                                <button className="btn-primary" onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); }}>Book Another</button>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <motion.div className="glass-card" style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Resources</h3>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '10px' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>2025 Rate Card</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>PDF • 2.4 MB</div>
                                </div>
                                <Download size={20} style={{ cursor: 'pointer' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Service Catalog</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>PDF • 5.1 MB</div>
                                </div>
                                <Download size={20} style={{ cursor: 'pointer' }} />
                            </div>
                        </motion.div>

                        <motion.div className="glass-card" style={{ padding: '25px', background: 'linear-gradient(135deg, rgba(112,0,255,0.2) 0%, rgba(3,0,20,0) 100%)' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Pro Tip</h3>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.8)' }}>
                                Preparing a detailed project brief before your consultation can save up to 30% of initial scoping time.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Consulting;
