import { Link } from 'react-router-dom';
import { listClients, listProjects } from './data';
import { ClientTable } from './Clients';
import { Empty, ErrorNote, formatZAR, PageHead, Panel, StatTile, useLoad } from './ui';

export default function Overview() {
    const { data, error, loading } = useLoad(() => Promise.all([listClients(), listProjects()]), []);
    const [clients, projects] = data ?? [[], []];

    const count = (status) => clients.filter((c) => c.status === status).length;
    const pipeline = clients
        .filter((c) => c.status === 'proposal' || c.status === 'active')
        .reduce((sum, c) => sum + (Number(c.value) || 0), 0);
    const show = (value) => (loading ? '…' : value);

    return (
        <>
            <PageHead
                crumbs={[{ label: 'Admin' }]}
                title="Dashboard"
                sub="Leads from the wizard, active clients and what’s live on the site."
                actions={
                    <>
                        <Link className="a-btn" to="/admin/clients/new">
                            Add client
                        </Link>
                        <Link className="a-btn a-btn-primary" to="/admin/projects/new">
                            New project
                        </Link>
                    </>
                }
            />
            <ErrorNote error={error} />

            <div className="a-stats">
                <StatTile label="New leads" value={show(count('new'))} sub="Waiting for first contact" />
                <StatTile label="Active clients" value={show(count('active'))} sub={`${count('completed')} completed`} />
                <StatTile label="Pipeline value" value={show(formatZAR(pipeline))} sub="Proposals + active work" />
                <StatTile
                    label="Live projects"
                    value={show(projects.filter((p) => p.published).length)}
                    sub={`${projects.length} in total`}
                />
            </div>

            <Panel
                title="Latest enquiries"
                sub="Newest first"
                action={
                    <Link className="a-link" to="/admin/clients">
                        All clients →
                    </Link>
                }
            >
                {clients.length > 0 ? (
                    <ClientTable clients={clients.slice(0, 6)} />
                ) : (
                    <Empty
                        message={
                            loading
                                ? 'Loading…'
                                : 'No enquiries yet. They appear here when someone completes the wizard or contact form.'
                        }
                    />
                )}
            </Panel>
        </>
    );
}
