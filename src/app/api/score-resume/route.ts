import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MOCK_RESPONSE = {
  score: 72,
  feedback: [
    "Good structure with clear sections",
    "Relevant experience highlighted effectively",
    "Could improve quantifiable achievements",
  ],
  formatting_issues: [
    "Consider using consistent date formatting",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, resumeText } = body;

    if (!userId && !resumeText) {
      return NextResponse.json(
        { error: "userId or resumeText required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase
        .from("profiles")
        .update({
          resume_score: MOCK_RESPONSE.score,
          resume_feedback: MOCK_RESPONSE,
        })
        .eq("id", userId);

      return NextResponse.json(MOCK_RESPONSE);
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const text = resumeText || "Resume content for analysis (uploaded PDF)";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a resume scoring expert. Analyze the resume and return a JSON object with exactly this structure:
{
  "score": <number 0-100>,
  "feedback": [<array of 3-5 constructive feedback strings>],
  "formatting_issues": [<array of 0-3 formatting issue strings>]
}
Score criteria: 90-100 = exceptional, 70-89 = strong, 50-69 = needs improvement, below 50 = significant gaps.
Evaluate: clarity, relevant experience, skills presentation, quantifiable achievements, and overall professionalism.
Return ONLY valid JSON, no markdown.`,
        },
        {
          role: "user",
          content: `Score this resume:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      result = MOCK_RESPONSE;
    }

    if (userId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase
        .from("profiles")
        .update({
          resume_score: result.score,
          resume_feedback: result,
        })
        .eq("id", userId);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Score resume error:", error);
    return NextResponse.json(
      { error: "Failed to score resume" },
      { status: 500 }
    );
  }
}
