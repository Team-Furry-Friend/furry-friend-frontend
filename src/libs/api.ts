import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const supabaseUrl = 'https://pnfgdtoqziegilxdoirt.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
