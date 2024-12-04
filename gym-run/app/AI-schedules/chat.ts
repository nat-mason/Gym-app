// pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";

// Define the expected shape of the request body
interface ChatRequestBody {
  userMessage: string;
}

// Define the shape of the response
interface ChatResponse {
  response: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ response: "", error: "Method not allowed" });
  }

  const { userMessage } = req.body as ChatRequestBody;

  if (!userMessage) {
    return res
      .status(400)
      .json({ response: "", error: "User message is required" });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "llama3-8b-8192",
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error with Groq SDK:", error);
    res.status(500).json({ response: "", error: "Internal Server Error" });
  }
}
