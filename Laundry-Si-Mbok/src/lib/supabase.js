import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Salin dari Supabase dashboard: Project Settings > API.
// HANYA anon/publishable key. Jangan pernah menaruh service_role key di sini.
const SUPABASE_URL = 'https://pziepgtezthzkzdsluid.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gSNpNgUzQr8O2yUi1KVORg_sgEuZr4-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage, // sesi tetap tersimpan setelah aplikasi ditutup
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // login Google (OAuth) menukar ?code= dengan sesi; tanpa ini yang kembali token implisit
  },
});
