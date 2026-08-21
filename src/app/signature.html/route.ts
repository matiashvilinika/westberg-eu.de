import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SIGNATURE_TOOL_HTML } from "./signature-tool";

// Internal tool — never cache and never render at build time, the response
// depends on the caller's session.
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/panel/login", request.url);
  loginUrl.searchParams.set("redirect", "/signature.html");

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(loginUrl);
  }

  // Same gate as the admin panel: a Supabase session alone is not enough,
  // the user has to have a row in admin_users.
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!adminUser) {
    return NextResponse.redirect(loginUrl);
  }

  return new NextResponse(SIGNATURE_TOOL_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
