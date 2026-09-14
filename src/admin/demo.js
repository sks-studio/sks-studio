// In-memory sample data for the admin demo. Nothing here touches the database;
// changes last until the page is reloaded.

const DAY = 86_400_000;
const ago = (days) => new Date(Date.now() - days * DAY).toISOString();
const stamp = () => new Date().toISOString();
const copy = (value) => structuredClone(value);
const reply = (value) => new Promise((resolve) => setTimeout(() => resolve(copy(value)), 150));
const fail = (message, code) => Promise.reject(Object.assign(new Error(message), code ? { code } : {}));

const BLANK_CLIENT = {
    phone: null,
    company: null,
    subject: null,
    contact_method: null,
    product: null,
    stage: null,
    industry: null,
    team_size: null,
    budget: null,
    timeline: null,
    services: [],
    features: [],
    goals: [],
    message: null,
    status: 'new',
    value: null,
    notes: null,
};

let clients = [
    {
        ...BLANK_CLIENT,
        id: 'demo-client-1',
        created_at: ago(0.2),
        updated_at: ago(0.2),
        name: 'Lerato Dlamini',
        email: 'lerato@example.com',
        phone: '+27 82 000 0001',
        company: 'Kasi Kitchen',
        contact_method: 'WhatsApp',
        product: 'Premium Online Store',
        stage: 'I have an idea',
        industry: 'Food & hospitality',
        team_size: '2–5 people',
        budget: 'R15 000 – R50 000',
        timeline: 'Within 1–3 months',
        services: ['Design', 'Premium commerce'],
        features: ['Product catalogue', 'Card & EFT payments', 'Delivery & collection'],
        goals: ['Sell online', 'Look more professional'],
        message: 'We sell meal kits on Instagram and want proper online ordering.',
        source: 'wizard',
    },
    {
        ...BLANK_CLIENT,
        id: 'demo-client-2',
        created_at: ago(2),
        updated_at: ago(1),
        name: 'Johan van Wyk',
        email: 'johan@example.com',
        company: 'Van Wyk Plumbing',
        subject: 'New project',
        contact_method: 'Phone call',
        message: 'Looking for a booking system so customers can schedule call-outs.',
        source: 'contact',
        status: 'contacted',
        notes: 'Called on Tuesday. Wants a quote for bookings + invoices.',
    },
    {
        ...BLANK_CLIENT,
        id: 'demo-client-3',
        created_at: ago(6),
        updated_at: ago(3),
        name: 'Dr Naledi Khumalo',
        email: 'naledi@example.com',
        company: 'Khumalo Family Practice',
        product: 'Custom Business Platform',
        stage: 'I have a design',
        industry: 'Health & wellness',
        team_size: '6–20 people',
        budget: 'R50 000 – R150 000',
        timeline: 'Within 3–6 months',
        features: ['Bookings & scheduling', 'Client portal', 'Staff roles & permissions'],
        goals: ['Save time on admin', 'Replace spreadsheets'],
        source: 'wizard',
        status: 'proposal',
        value: 85000,
        notes: 'Proposal sent 12 Sept. Follow up next week.',
    },
    {
        ...BLANK_CLIENT,
        id: 'demo-client-4',
        created_at: ago(21),
        updated_at: ago(4),
        name: 'Ayesha Patel',
        email: 'ayesha@example.com',
        company: 'Glow Beauty Bar',
        product: 'Client Growth System',
        industry: 'Beauty & personal care',
        source: 'admin',
        status: 'active',
        value: 42000,
        notes: 'Build in progress — pipeline and WhatsApp templates this sprint.',
    },
    {
        ...BLANK_CLIENT,
        id: 'demo-client-5',
        created_at: ago(48),
        updated_at: ago(10),
        name: 'Thabo Mokoena',
        email: 'thabo@example.com',
        company: 'Mokoena Logistics',
        product: 'Custom Business Platform',
        source: 'wizard',
        status: 'completed',
        value: 120000,
    },
    {
        ...BLANK_CLIENT,
        id: 'demo-client-6',
        created_at: ago(30),
        updated_at: ago(25),
        name: 'Grace Botha',
        email: 'grace@example.com',
        subject: 'General question',
        message: 'Do you build mobile apps?',
        source: 'contact',
        status: 'lost',
        notes: 'Needed a native app only — referred elsewhere.',
    },
];

let projects = [
    {
        id: 'demo-project-1',
        created_at: ago(40),
        updated_at: ago(5),
        title: 'Kasi Kitchen online store',
        slug: 'kasi-kitchen-online-store',
        category: 'Online store',
        summary: 'A meal-kit business moved from Instagram DMs to a proper store with card payments and delivery slots.',
        body: 'Kasi Kitchen was taking every order by hand.\n\nWe built a store with a clear menu, card and EFT payments and delivery-slot booking, so orders arrive complete and paid.',
        image_url: '/assets/sks-founder-portal.jpg',
        cta_label: 'Start your store',
        published: true,
        featured: true,
        sort_order: 0,
    },
    {
        id: 'demo-project-2',
        created_at: ago(60),
        updated_at: ago(20),
        title: 'Practice booking platform',
        slug: 'practice-booking-platform',
        category: 'Business platform',
        summary: 'Online bookings, patient reminders and a staff calendar for a busy family practice.',
        body: 'Front-desk staff were juggling three calendars.\n\nOne platform now handles bookings, reminders and staff schedules.',
        image_url: '/assets/sks-founder-vision.jpg',
        cta_label: 'Plan your platform',
        published: true,
        featured: false,
        sort_order: 1,
    },
    {
        id: 'demo-project-3',
        created_at: ago(3),
        updated_at: ago(1),
        title: 'Spring growth offer',
        slug: 'spring-growth-offer',
        category: 'Offer',
        summary: 'Draft offer: a Client Growth System set up in two weeks.',
        body: '',
        image_url: '/assets/sks-team-ai.jpg',
        cta_label: 'Claim the offer',
        published: false,
        featured: false,
        sort_order: 2,
    },
];

let staff = [
    {
        email: 'demo@sksstudio.co.za',
        created_at: ago(90),
        updated_at: ago(90),
        name: 'Demo Superadmin',
        title: 'Founder',
        phone: null,
        role: 'superadmin',
        active: true,
    },
    {
        email: 'thandi@example.com',
        created_at: ago(60),
        updated_at: ago(60),
        name: 'Thandi Nkosi',
        title: 'Project manager',
        phone: null,
        role: 'staff',
        active: true,
    },
    {
        email: 'sipho@example.com',
        created_at: ago(30),
        updated_at: ago(12),
        name: 'Sipho Ndlovu',
        title: 'Developer',
        phone: null,
        role: 'staff',
        active: false,
    },
];

const sortProjects = (rows) =>
    [...rows].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at),
    );

export const demo = {
    getMyRole: () => reply('superadmin'),

    listClients: () => reply([...clients].sort((a, b) => b.created_at.localeCompare(a.created_at))),
    getClient: (id) => {
        const row = clients.find((c) => c.id === id);
        return row ? reply(row) : fail('That client doesn’t exist.');
    },
    addClient: (client) => {
        const row = { ...BLANK_CLIENT, ...client, id: crypto.randomUUID(), created_at: stamp(), updated_at: stamp() };
        clients = [row, ...clients];
        return reply(row);
    },
    updateClient: (id, patch) => {
        clients = clients.map((c) => (c.id === id ? { ...c, ...patch, updated_at: stamp() } : c));
        return reply(clients.find((c) => c.id === id));
    },
    deleteClient: (id) => {
        clients = clients.filter((c) => c.id !== id);
        return reply(null);
    },

    listProjects: () => reply(sortProjects(projects)),
    getProject: (id) => {
        const row = projects.find((p) => p.id === id);
        return row ? reply(row) : fail('That project doesn’t exist.');
    },
    saveProject: ({ id, ...fields }) => {
        if (fields.slug && projects.some((p) => p.slug === fields.slug && p.id !== id)) {
            return fail('duplicate slug', '23505');
        }
        if (id) {
            projects = projects.map((p) => (p.id === id ? { ...p, ...fields, updated_at: stamp() } : p));
            return reply(projects.find((p) => p.id === id));
        }
        const row = { ...fields, id: crypto.randomUUID(), created_at: stamp(), updated_at: stamp() };
        projects = [...projects, row];
        return reply(row);
    },
    deleteProject: (id) => {
        projects = projects.filter((p) => p.id !== id);
        return reply(null);
    },
    uploadProjectImage: (file) => reply(URL.createObjectURL(file)),

    listStaff: () =>
        reply([...staff].sort((a, b) => b.role.localeCompare(a.role) || a.name.localeCompare(b.name))),
    saveStaff: (member, originalEmail) => {
        const row = { ...member, email: member.email.trim().toLowerCase() };
        const taken = staff.some((s) => s.email === row.email && s.email !== originalEmail);
        if (taken) return fail('Someone on the team already uses that email.', '23505');
        const others = staff.filter((s) => s.email !== originalEmail);
        const keepsSuperadmin = others.some((s) => s.role === 'superadmin' && s.active) || (row.role === 'superadmin' && row.active);
        if (!keepsSuperadmin) return fail('At least one active superadmin is required.');
        const existing = staff.find((s) => s.email === originalEmail);
        const saved = { ...existing, ...row, created_at: existing?.created_at ?? stamp(), updated_at: stamp() };
        staff = [...others, saved];
        return reply(saved);
    },
    deleteStaff: (email) => {
        const others = staff.filter((s) => s.email !== email);
        if (!others.some((s) => s.role === 'superadmin' && s.active)) {
            return fail('At least one active superadmin is required.');
        }
        staff = others;
        return reply(null);
    },
};
