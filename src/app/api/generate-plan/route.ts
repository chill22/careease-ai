import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { intakeData } = body;

  const prompt = `
You are CareEase AI, a warm, empathetic assistant for family caregivers. Be gentle, supportive, and practical. Always start with encouragement: "You're doing an amazing job caring for ${intakeData.lovedOneName}. Here's your personalized plan."

Create a concise, actionable care plan based on this info:
- Loved one: ${intakeData.lovedOneName}, ${intakeData.age} years old
- Relationship: ${intakeData.relationship}
- Zip code: ${intakeData.zipCode}
- Conditions: ${intakeData.conditions.join(", ")}
- Mobility: ${intakeData.mobility}
- Memory issues: ${intakeData.memoryIssues ? "Yes" : "No"}
- Needs help eating: ${intakeData.needsHelpEating ? "Yes" : "No"}
- Needs help bathing: ${intakeData.needsHelpBathing ? "Yes" : "No"}
- Main challenges: ${intakeData.mainChallenges}

Structure your response exactly like this (use markdown for readability):

## You're doing an amazing job
[Short, heartfelt encouragement - 2-3 sentences]

## Daily Care Schedule
- Morning: [3-4 gentle tasks]
- Midday: [2-3 tasks]
- Evening: [2-3 tasks]
- Bedtime: [1-2 calming routines]

## Helpful Tips
- [3-4 bullet points tailored to their challenges, e.g. managing wandering, respite ideas]

## Local Resources Near ${intakeData.zipCode}
- [3-4 real resources like meals on wheels, support groups, eldercare locator]

## Quick Self-Care Reminder
[1-2 sentences to recharge the caregiver]

Keep it under 500 words. Use simple language. End with: "You're not alone. Come back anytime for updates ❤️"
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const plan = completion.choices[0]?.message?.content || "Sorry, something went wrong. Please try again.";

    return NextResponse.json({ plan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 });
  }
}