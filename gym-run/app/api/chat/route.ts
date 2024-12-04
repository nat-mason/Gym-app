import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userMessage } = body;

    if (!userMessage) {
      return NextResponse.json(
        { error: "User message is required" },
        { status: 400 }
      );
    }

    // Call the Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "llama3-8b-8192",
    });

    // Extract the response
    const groqResponse = chatCompletion.choices[0]?.message?.content || "";

    // Return the Groq response
    return NextResponse.json({ response: groqResponse });
  } catch (error) {
    console.error("Error with Groq API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
