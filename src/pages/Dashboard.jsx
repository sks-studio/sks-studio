import React from 'react';
import { Users, FileText, DollarSign, Plus } from 'lucide-react';

const Dashboard = () => {
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '40px' }} className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Admin <span className="text-gradient">Dashboard</span></h1>
                <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                    <Plus size={16} style={{ marginBottom: '-3px', marginRight: '5px' }} /> New Project
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <StatCard title="Active Clients" value="12" icon={<Users color="#00c3ff" />} />
                <StatCard title="Pending Invoices" value="$4,500" icon={<FileText color="#ff0055" />} />
                <StatCard title="Monthly Revenue" value="$12,800" icon={<DollarSign color="#7000ff" />} />
            </div>

            {/* Client List */}
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
        </div>
    );
};

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
