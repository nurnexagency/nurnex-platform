import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  DEMO_COOKIE_NAME,
  parseDemoSessionCookieValue,
} from "@/lib/demo-auth";
import { getSupabaseCredentials, isSupabaseConfigured } from "./config";

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  const demoSession = parseDemoSessionCookieValue(
    request.cookies.get(DEMO_COOKIE_NAME)?.value
  );

  if (!isSupabaseConfigured()) {
    if (!demoSession && pathname.startsWith("/dashboard")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
    if (
      demoSession &&
      (pathname === "/login" || pathname === "/signup")
    ) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname =
        demoSession.role === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard/candidate";
      return NextResponse.redirect(nextUrl);
    }
    return supabaseResponse;
  }

  const { url: supabaseUrl, anonKey: supabaseKey } = getSupabaseCredentials();

  let response = supabaseResponse;

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const authed = Boolean(user || demoSession);

    if (!authed && pathname.startsWith("/dashboard")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }

    if (user && (pathname === "/login" || pathname === "/signup")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname =
        profile?.role === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard/candidate";
      return NextResponse.redirect(nextUrl);
    }

    if (
      !user &&
      demoSession &&
      (pathname === "/login" || pathname === "/signup")
    ) {
      const nextUrl = request.nextUrl.clone();
      nextUrl.pathname =
        demoSession.role === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard/candidate";
      return NextResponse.redirect(nextUrl);
    }
  } catch {
    if (!demoSession && pathname.startsWith("/dashboard")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}
