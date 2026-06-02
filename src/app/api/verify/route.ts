import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [{ data: profile }, { data: videos }] = await Promise.all([
      supabase
        .from("profiles")
        .select("resume_url, resume_score, portfolio_url, github_url, verification_status")
        .eq("id", userId)
        .single(),
      supabase
        .from("candidate_videos")
        .select("type")
        .eq("user_id", userId),
    ]);

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const videoTypes = new Set(
      videos?.map((v: { type: string }) => v.type) ?? []
    );

    const checklist = {
      hasResume: !!profile.resume_url,
      resumeScorePassing: (profile.resume_score ?? 0) >= 60,
      hasIntroVideo: videoTypes.has("intro"),
      hasProjectVideo: videoTypes.has("project"),
      hasExpectationsVideo: videoTypes.has("expectations"),
      hasPortfolioUrl: !!(profile.portfolio_url || profile.github_url),
    };

    const allMet = Object.values(checklist).every(Boolean);

    if (allMet && profile.verification_status !== "verified") {
      await supabase
        .from("profiles")
        .update({ verification_status: "verified" })
        .eq("id", userId);
    }

    return NextResponse.json({
      verified: allMet,
      checklist,
    });
  } catch (error) {
    console.error("Verification check error:", error);
    return NextResponse.json(
      { error: "Verification check failed" },
      { status: 500 }
    );
  }
}
