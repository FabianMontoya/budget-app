import { createClient } from '@supabase/supabase-js';

const options = {
  global: {
    headers: { 'x-app-id': 'random-app-header-request' }
  }
};
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, options);

const auth = supabase.auth;

export default supabase;

export { auth };
