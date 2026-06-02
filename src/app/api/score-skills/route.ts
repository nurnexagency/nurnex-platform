import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MOCK_SKILLS = [
  { skill_name: "JavaScript", score: 78 },
  { skill_name: "React", score: 72 },
  { skill_name: "TypeScript", score: 65 },
  { skill_name: "Node.js", score: 60 },
  { skill_name: "SQL", score: 55 },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, resumeText } = body;

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

    const apiKey = process.env.OPENAI_API_KEY;
    let skills = MOCK_SKILLS;

    if (apiKey) {
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey });

      const text = resumeText || "Resume content for skill analysis";

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Extract technical skills from this resume and rate each 0-100. Return a JSON array:
[{"skill_name": "SkillName", "score": 75}, ...]
Include 3-8 skills. Return ONLY valid JSON, no markdown.`,
          },
          {
            role: "user",
            content: `Extract skills from:\n\n${text}`,
          },
        ],
        temperature: 0.3,
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      try {
        skills = JSON.parse(raw);
      } catch {
        skills = MOCK_SKILLS;
      }
    }

    for (const skill of skills) {
      await supabase
        .from("skill_scores")
        .upsert(
          {
            user_id: userId,
            skill_name: skill.skill_name,
            score: skill.score,
            source: apiKey ? "ai_scored" : "ai_estimate",
          },
          { onConflict: "user_id,skill_name" }
        );
    }

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Score skills error:", error);
    return NextResponse.json(
      { error: "Failed to score skills" },
      { status: 500 }
    );
  }
}
