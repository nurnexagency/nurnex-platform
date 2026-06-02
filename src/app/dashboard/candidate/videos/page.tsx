"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner, PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

type VideoType = "intro" | "project" | "expectations";

type VideoCard = {
  type: VideoType;
  title: string;
  description: string;
  url: string | null;
  uploading: boolean;
};

const VIDEO_CONFIG: { type: VideoType; title: string; description: string }[] = [
  {
    type: "intro",
    title: "Introduction",
    description: "Introduce yourself — who you are, your background, and what drives you.",
  },
  {
    type: "project",
    title: "Project Explanation",
    description: "Walk through a project you're proud of — what you built and why.",
  },
  {
    type: "expectations",
    title: "Expectations",
    description: "Share what you're looking for — role type, culture, and growth goals.",
  },
];

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoCard[]>(
    VIDEO_CONFIG.map((v) => ({ ...v, url: null, uploading: false }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("candidate_videos")
        .select("type, video_url")
        .eq("user_id", user.id);

      if (data) {
        setVideos((prev) =>
          prev.map((v) => {
            const match = data.find(
              (d: { type: string; video_url: string }) => d.type === v.type
            );
            return match ? { ...v, url: match.video_url } : v;
          })
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleUpload(type: VideoType, file: File) {
    setVideos((prev) =>
      prev.map((v) => (v.type === type ? { ...v, uploading: true } : v))
    );

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const path = `${user.id}/${type}.mp4`;

    const { error: uploadError } = await supabase.storage
      .from("videos")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast(`Failed to upload: ${uploadError.message}`, "error");
      setVideos((prev) =>
        prev.map((v) => (v.type === type ? { ...v, uploading: false } : v))
      );
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("videos").getPublicUrl(path);

    const { error: upsertError } = await supabase
      .from("candidate_videos")
      .upsert(
        { user_id: user.id, type, video_url: publicUrl },
        { onConflict: "user_id,type" }
      );

    if (upsertError) {
      toast(`Failed to save: ${upsertError.message}`, "error");
    } else {
      toast(`${type} video uploaded`, "success");

      try {
        await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
      } catch {
        // best-effort verification check
      }
    }

    setVideos((prev) =>
      prev.map((v) =>
        v.type === type ? { ...v, url: publicUrl, uploading: false } : v
      )
    );
  }

  if (loading) return <PageLoader />;

  const uploadedCount = videos.filter((v) => v.url).length;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Video Introductions</h1>
      <p className="text-muted text-sm mb-2">
        Record and upload your video introductions. All 3 videos required for
        verification.
      </p>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-full bg-background rounded-full h-2 max-w-xs">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(uploadedCount / 3) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted">{uploadedCount}/3</span>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.type}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{video.title}</h3>
                  {video.url && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Uploaded
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted">{video.description}</p>
              </div>
              <div className="text-2xl">
                {video.url ? (
                  <span className="text-primary">✓</span>
                ) : (
                  <span className="text-border">○</span>
                )}
              </div>
            </div>

            {video.url && (
              <div className="mt-4">
                <video
                  src={video.url}
                  controls
                  className="w-full max-h-48 rounded-lg bg-background"
                />
              </div>
            )}

            <div className="mt-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                {video.uploading ? (
                  <span className="flex items-center gap-2 text-sm text-muted">
                    <Spinner className="h-4 w-4" /> Uploading...
                  </span>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(video.type, file);
                      }}
                    />
                    <span className="text-sm text-primary hover:underline cursor-pointer">
                      {video.url ? "Replace video" : "Upload video"}
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
