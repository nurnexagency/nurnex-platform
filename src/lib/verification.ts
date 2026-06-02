import type { SupabaseClient } from "@supabase/supabase-js";

export type VerificationChecklist = {
  hasResume: boolean;
  resumeScorePassing: boolean;
  hasIntroVideo: boolean;
  hasProjectVideo: boolean;
  hasExpectationsVideo: boolean;
  hasPortfolioUrl: boolean;
  allMet: boolean;
};

export async function getVerificationStatus(
  supabase: SupabaseClient,
  userId: string
): Promise<VerificationChecklist> {
  const [{ data: profile }, { data: videos }] = await Promise.all([
    supabase
      .from("profiles")
      .select("resume_url, resume_score, portfolio_url, github_url")
      .eq("id", userId)
      .single(),
    supabase
      .from("candidate_videos")
      .select("type")
      .eq("user_id", userId),
  ]);

  const videoTypes = new Set(videos?.map((v: { type: string }) => v.type) ?? []);

  const checklist: VerificationChecklist = {
    hasResume: !!profile?.resume_url,
    resumeScorePassing: (profile?.resume_score ?? 0) >= 60,
    hasIntroVideo: videoTypes.has("intro"),
    hasProjectVideo: videoTypes.has("project"),
    hasExpectationsVideo: videoTypes.has("expectations"),
    hasPortfolioUrl: !!(profile?.portfolio_url || profile?.github_url),
    allMet: false,
  };

  checklist.allMet =
    checklist.hasResume &&
    checklist.resumeScorePassing &&
    checklist.hasIntroVideo &&
    checklist.hasProjectVideo &&
    checklist.hasExpectationsVideo &&
    checklist.hasPortfolioUrl;

  return checklist;
}

export async function updateVerificationIfReady(
  supabase: SupabaseClient,
  userId: string
) {
  const checklist = await getVerificationStatus(supabase, userId);

  if (checklist.allMet) {
    await supabase
      .from("profiles")
      .update({ verification_status: "verified" })
      .eq("id", userId);
  }

  return checklist;
}
