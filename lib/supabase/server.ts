import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("Server-side Supabase URL:", supabaseUrl ? "Defined" : "Undefined");
  console.log("Server-side Supabase Anon Key:", supabaseAnonKey ? "Defined" : "Undefined");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing on the server side.");
  }

  try {
    const client = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });
    console.log("Supabase server client successfully created.");
    return client;
  } catch (error) {
    console.error("Error creating Supabase server client:", error);
    throw error;
  }
}
