import React, { useState } from 'react';
import { Users, FileText, DollarSign, Plus, Calendar, Clock, MoreHorizontal } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Admin <span className="text-gradient">Dashboard</span></h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '8px 16px', background: 'rgba(255,255,255,0.1)' }}>
                        Export Report
                    </button>
                    <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                        <Plus size={16} style={{ marginBottom: '-3px', marginRight: '5px' }} /> New Project
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                <TabItem label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <TabItem label="Appointments" active={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')} />
                <TabItem label="Invoices" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
            </div>

            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'appointments' && <AppointmentsTab />}
            {activeTab === 'invoices' && <InvoicesTab />}

        </div>
    );
};

const TabItem = ({ label, active, onClick }) => (
    <div
        onClick={onClick}
        style={{
            cursor: 'pointer',
            padding: '10px 0',
            color: active ? 'white' : 'rgba(255,255,255,0.5)',
            borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
            marginBottom: '-12px',
            transition: 'all 0.3s'
        }}
    >
        {label}
    </div>
);

const OverviewTab = () => (
    <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <StatCard title="Active Clients" value="12" icon={<Users color="#00c3ff" />} />
            <StatCard title="Pending Invoices" value="$4,500" icon={<FileText color="#ff0055" />} />
            <StatCard title="Monthly Revenue" value="$12,800" icon={<DollarSign color="#7000ff" />} />
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '20px' }}>Recent Clients</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text-muted)' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                            <th style={{ padding: '15px 10px', color: 'white' }}>Client</th>
                            <th style={{ padding: '15px 10px', color: 'white' }}>Project</th>
                            <th style={{ padding: '15px 10px', color: 'white' }}>Status</th>
                            <th style={{ padding: '15px 10px', color: 'white' }}>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow client="Acme Corp" project="Website Redesign" status="Active" invoice="Sent" />
                        <TableRow client="TechGlobal" project="Cloud Migration" status="Review" invoice="Paid" />
                        <TableRow client="StartUp Inc" project="MVP Development" status="Pending" invoice="Draft" />
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

const AppointmentsTab = () => (
    <div className="glass-panel" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '0' }}>Upcoming Appointments</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '5px' }}>Today</button>
                <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', padding: '8px 15px' }}>This Week</button>
            </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <AppointmentCard
                time="09:00 AM"
                date="Today"
                client="John Doe"
                type="Consultation Phase 1"
                status="Confirmed"
            />
            <AppointmentCard
                time="02:00 PM"
                date="Today"
                client="Sarah Smith"
                type="Brand Audit"
                status="Pending"
            />
            <AppointmentCard
                time="10:00 AM"
                date="Tomorrow"
                client="Tech Solutions Ltd"
                type="System Architecture Review"
                status="Confirmed"
            />
        </div>
    </div>
);

const AppointmentCard = ({ time, date, client, type, status }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        borderLeft: `4px solid ${status === 'Confirmed' ? '#00ff64' : '#ffaa00'}`
    }}>
        <div style={{ marginRight: '30px', minWidth: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white', fontWeight: 'bold' }}>
                <Clock size={16} /> {time}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{date}</div>
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{client}</h4>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{type}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                background: status === 'Confirmed' ? 'rgba(0,255,100,0.1)' : 'rgba(255,170,0,0.1)',
                color: status === 'Confirmed' ? '#00ff64' : '#ffaa00'
            }}>
                {status}
            </span>
            <MoreHorizontal size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
        </div>
    </div>
);

const InvoicesTab = () => (
    <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-text-muted)' }}>
        Invoices Module Loaded...
    </div>
);

const StatCard = ({ title, value, icon }) => (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{title}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{value}</div>
        </div>
    </div>
);

const TableRow = ({ client, project, status, invoice }) => (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <td style={{ padding: '15px 10px', color: 'white' }}>{client}</td>
        <td style={{ padding: '15px 10px' }}>{project}</td>
        <td style={{ padding: '15px 10px' }}>
            <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                background: status === 'Active' ? 'rgba(0,195,255,0.2)' : status === 'Paid' ? 'rgba(0,255,100,0.2)' : 'rgba(255,255,255,0.1)',
                color: status === 'Active' ? '#00c3ff' : status === 'Paid' ? '#00ff64' : 'white'
            }}>
                {status}
            </span>
        </td>
        <td style={{ padding: '15px 10px' }}>{invoice}</td>
    </tr>
);

export default Dashboard;
