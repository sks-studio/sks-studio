// All site copy lives here so wording can change without touching layout.

export const CONTACT_EMAIL = 'hello@sksstudio.co.za';
export const LEGAL_NAME = 'Systems Knowledge & Software (Pty) Ltd';
export const LOGO = '/assets/sks-logo.jpg';

const IMG = {
    vision: '/assets/sks-founder-vision.jpg',
    portal: '/assets/sks-founder-portal.jpg',
    team: '/assets/sks-team-ai.jpg',
};

export const NAV = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact', to: '/contact' },
];

export const HERO_SLIDES = [
    { src: IMG.vision, alt: 'South African founder developing a SaaS product' },
    { src: IMG.portal, alt: 'Founder using a secure business platform' },
    { src: IMG.team, alt: 'Product team planning an AI workflow' },
];

export const PRINCIPLES = [
    { title: 'Own the product.', text: 'Your platform. Your data.' },
    { title: 'Launch the essential.', text: 'Start with what creates value.' },
    { title: 'Grow with evidence.', text: 'Build from real customer use.' },
];

export const PRODUCTS = [
    {
        id: 'platform',
        no: '01',
        title: 'Custom Business Platform',
        text: 'Run the important parts of your business in one place.',
        cta: 'Build yours',
        image: IMG.vision,
        alt: 'Custom business platform',
    },
    {
        id: 'store',
        no: '02',
        title: 'Premium Online Store',
        text: 'Present your offer beautifully and make buying easy.',
        cta: 'Start selling',
        image: IMG.portal,
        alt: 'Premium online store',
    },
    {
        id: 'growth',
        no: '03',
        title: 'Client Growth System',
        text: 'Keep leads, clients and follow-ups clear and organised.',
        cta: 'Grow better',
        image: IMG.team,
        alt: 'Client growth system',
    },
];

export const STAGES = [
    { id: 'idea', label: 'I have an idea' },
    { id: 'design', label: 'I have a design' },
    { id: 'product', label: 'I have a product' },
];

export const METHOD = [
    { no: '01', title: 'Choose', text: 'Choose the business tool that will create value fastest.' },
    { no: '02', title: 'Build', text: 'We design and build it around your business.' },
    { no: '03', title: 'Launch', text: 'Go live, start selling and improve what works.' },
];

export const SERVICES = [
    {
        no: '00',
        title: 'Design',
        text: 'Shape the idea, customer journey and visual direction before we build.',
        chips: ['Strategy', 'Brand', 'UX/UI'],
    },
    {
        no: '01',
        title: 'Digital presence',
        text: 'A trusted name, professional email and polished online presence.',
        chips: ['Domain', 'Email', 'Identity'],
    },
    {
        no: '02',
        title: 'Premium commerce',
        text: 'A refined online store designed to turn interest into sales.',
        chips: ['Cloud', 'SSL', 'Backups'],
    },
    {
        no: '03',
        title: 'Business operations',
        text: 'One clear platform for the work that keeps your company moving.',
        chips: ['UX/UI', 'Web apps', 'MVPs'],
    },
    {
        no: '04',
        title: 'Client relationships',
        text: 'Keep every lead, client and follow-up organised in one place.',
        chips: ['Brand', 'Go-to-market', 'Growth'],
    },
    {
        no: '05',
        title: 'Time-saving automation',
        text: 'Save time by letting repetitive work happen automatically.',
        chips: ['Automation', 'Agents', 'Insights'],
    },
    {
        no: '06',
        title: 'Ongoing care',
        text: 'Reliable support and improvements as your business grows.',
        chips: ['Deploy', 'Monitor', 'Support'],
    },
];

export const PAGES = {
    about: {
        eyebrow: 'About SKS Studio',
        title: 'Built for\nownership.',
        copy: 'We help one business at a time turn a clear idea into a valuable digital system.',
        image: IMG.vision,
        alt: 'Founder shaping a business idea',
    },
    services: {
        eyebrow: 'Services',
        title: 'One system.\nSeven spaces.',
        copy: 'Everything needed to take your business from idea to a working digital product.',
        image: IMG.team,
        alt: 'Team planning a business system',
    },
    projects: {
        eyebrow: 'Projects',
        title: 'Built for\ngrowth.',
        copy: 'Premium digital products with a clear business purpose.',
        image: IMG.portal,
        alt: 'Founder using a custom business platform',
    },
    contact: {
        eyebrow: 'Contact · Remote South Africa',
        title: 'Let’s build\nwhat matters.',
        copy: 'A direct conversation about your business, your goal and the right first step.',
        image: IMG.vision,
        alt: 'Founder ready to start a project',
    },
};

export const VALUES = [
    { no: '01', title: 'One business at a time.', text: 'Focused attention. Clear decisions. Better work.' },
    { no: '02', title: 'Simple from the start.', text: 'Plain language, visible progress and no unnecessary complexity.' },
    { no: '03', title: 'Built to keep growing.', text: 'Your system can evolve as your customers and opportunities grow.' },
];
