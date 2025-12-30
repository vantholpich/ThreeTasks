import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and Anon Key
const supabaseUrl = 'https://cepncaweaxczveipoxqb.supabase.co';
const supabaseAnonKey = 'sb_publishable_v63Xq8bZ1hehm5qrwAU_nQ_-GtUKgPv';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
