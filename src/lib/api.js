import { SUPABASE_READY } from '../config';

// supabase-js is loaded on demand so visitors who never submit a form don't download it.
async function db() {
    if (!SUPABASE_READY) throw new Error('The database isn’t connected yet.');
    const { supabase } = await import('./supabase');
    return supabase;
}

const unwrap = ({ data, error }) => {
    if (error) throw error;
    return data;
};

// ─── Public site ──────────────────────────────────────────────

// Visitors can insert enquiries but never read them back, so no .select() here.
export async function submitEnquiry(enquiry) {
    const sb = await db();
    unwrap(await sb.from('clients').insert(enquiry));
}

export async function listPublishedProjects() {
    if (!SUPABASE_READY) return [];
    const sb = await db();
    return unwrap(
        await sb
            .from('projects')
            .select('id, slug, title, category, summary, image_url')
            .eq('published', true)
            .order('featured', { ascending: false })
            .order('sort_order')
            .order('created_at', { ascending: false }),
    );
}

export async function getPublishedProject(slug) {
    if (!SUPABASE_READY) return null;
    const sb = await db();
    return unwrap(await sb.from('projects').select('*').eq('slug', slug).eq('published', true).maybeSingle());
}

// ─── Admin: auth ──────────────────────────────────────────────

export async function signIn(email, password) {
    const sb = await db();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
}

export async function signOut() {
    const sb = await db();
    await sb.auth.signOut();
}

// 'superadmin' | 'staff' | null — set by the staff table in the database.
export async function getMyRole() {
    const sb = await db();
    return unwrap(await sb.rpc('staff_role')) ?? null;
}

// ─── Admin: staff ─────────────────────────────────────────────

export async function listStaff() {
    const sb = await db();
    return unwrap(await sb.from('staff').select('*').order('role', { ascending: false }).order('name'));
}

// Pass `originalEmail` when editing (email is the key and may itself change).
export async function saveStaff(member, originalEmail) {
    const sb = await db();
    const row = { ...member, email: member.email.trim().toLowerCase() };
    const query = originalEmail
        ? sb.from('staff').update(row).eq('email', originalEmail)
        : sb.from('staff').insert(row);
    return unwrap(await query.select().single());
}

export async function deleteStaff(email) {
    const sb = await db();
    unwrap(await sb.from('staff').delete().eq('email', email));
}

// ─── Admin: clients ───────────────────────────────────────────

export async function listClients() {
    const sb = await db();
    return unwrap(await sb.from('clients').select('*').order('created_at', { ascending: false }));
}

export async function getClient(id) {
    const sb = await db();
    return unwrap(await sb.from('clients').select('*').eq('id', id).single());
}

export async function addClient(client) {
    const sb = await db();
    return unwrap(await sb.from('clients').insert(client).select().single());
}

export async function updateClient(id, patch) {
    const sb = await db();
    return unwrap(await sb.from('clients').update(patch).eq('id', id).select().single());
}

export async function deleteClient(id) {
    const sb = await db();
    unwrap(await sb.from('clients').delete().eq('id', id));
}

// ─── Admin: projects ──────────────────────────────────────────

export async function listProjects() {
    const sb = await db();
    return unwrap(
        await sb
            .from('projects')
            .select('*')
            .order('featured', { ascending: false })
            .order('sort_order')
            .order('created_at', { ascending: false }),
    );
}

export async function getProject(id) {
    const sb = await db();
    return unwrap(await sb.from('projects').select('*').eq('id', id).single());
}

// Updates when `id` is given, otherwise creates.
export async function saveProject({ id, ...fields }) {
    const sb = await db();
    const query = id ? sb.from('projects').update(fields).eq('id', id) : sb.from('projects').insert(fields);
    return unwrap(await query.select().single());
}

export async function deleteProject(id) {
    const sb = await db();
    unwrap(await sb.from('projects').delete().eq('id', id));
}

export async function uploadProjectImage(file) {
    const sb = await db();
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bucket = sb.storage.from('project-images');
    unwrap(await bucket.upload(path, file, { cacheControl: '31536000', contentType: file.type }));
    return bucket.getPublicUrl(path).data.publicUrl;
}
