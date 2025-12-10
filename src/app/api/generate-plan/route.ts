// src/app/api/generate-plan/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { intakeData } = await req.json();

    const prompt = `You are CareEase AI, a warm, empathetic assistant for family caregivers. Create a beautiful, practical care plan for ${intakeData.lovedOneName || "your loved one"} (${intakeData.age || "?"} years old).

Conditions: ${intakeData.conditions?.join(", ") || "none specified"}
Mobility: ${intakeData.mobility || "unknown"}
Memory issues: ${intakeData.memoryIssues ? "yes" : "no"}
Main challenge: ${intakeData.mainChallenges || "not shared"}

Return ONLY markdown. Start with encouragement. Include:
- Daily schedule
- 3–5 practical tips
- Local resource ideas for zip ${intakeData.zipCode || "your area"}
- End with "You're not alone ❤️"

Keep under 600 words. Use headers, bullets, warmth.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const plan = completion.choices[0]?.message?.content || "I'm having trouble connecting right now. Please try again in a moment ❤️";

    return NextResponse.json({ plan });
  } catch (error: any) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { plan: `*We're experiencing high demand right now — our AI is taking a quick breather.*\n\nPlease try again in 30 seconds. You're doing an amazing job, and we're here for you ❤️` },
      { status: 200 } // Return 200 so page doesn't crash
    );
  }
}