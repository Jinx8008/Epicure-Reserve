
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://baluxfvdedbzyuwfzbbx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbHV4ZnZkZWRienl1d2Z6YmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzY3NjYsImV4cCI6MjA3MTk1Mjc2Nn0.iRFVkMV7EZPQQEWD1JWz1EOzWIF9V66pMG4gXzMgh7A"; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
