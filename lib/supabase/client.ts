import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("Client-side Supabase URL:", supabaseUrl ? "Defined" : "Undefined");
  console.log("Client-side Supabase Anon Key:", supabaseAnonKey ? "Defined" : "Undefined");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing on the client side.");
  }

  try {
    const client = createBrowserClient(supabaseUrl!, supabaseAnonKey!);
    console.log("Supabase browser client successfully created.");
    return client;
  } catch (error) {
    console.error("Error creating Supabase browser client:", error);
    throw error;
  }
}
