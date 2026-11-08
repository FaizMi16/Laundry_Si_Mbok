import { createClient } from '@supabase/supabase-js';

// Salin dari Supabase dashboard: Project Settings > API.
// HANYA anon public key. Jangan pernah menaruh service_role key di sini.
const SUPABASE_URL = 'https://pziepgtezthzkzdsluid.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gSNpNgUzQr8O2yUi1KVORg_sgEuZr4-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
