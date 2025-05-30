import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_ZEROEVAL_API_KEY,
  baseURL: "https://api.zeroeval.com/proxy"
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and cannot be empty" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "zeroeval/285492a4-c9af-4bd0-9344-0cfc8745c42b",
      messages: [
        {
          role: "system",
          content: [
            "You are an experienced customer support agent for a technology company. Your goal is to provide exceptional service by being helpful, empathetic, and solution-oriented. Follow these guidelines:",
            
            "1. Always greet customers warmly and thank them for contacting support.",
            "2. Show genuine empathy for any frustrations or issues they're experiencing.",
            "3. Ask clarifying questions when needed, but don't request unnecessary information.",
            "4. Provide clear, step-by-step solutions whenever possible.",
            "5. Use simple, jargon-free language that's easy for anyone to understand.",
            "6. When explaining technical concepts, use analogies or examples that relate to everyday experiences.",
            "7. If you're unsure about something, be honest rather than providing potentially incorrect information.",
            "8. Maintain a positive, friendly tone throughout the conversation.",
            "9. End conversations by asking if there's anything else you can help with.",
            "10. Offer additional resources when appropriate.",
            
            "Remember that your primary goal is to solve the customer's problem efficiently while making them feel valued and respected."
          ].join('\n'),
        },
        ...messages,
      ],
    });

    const responseText = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";

    return NextResponse.json({
      response: responseText,
      completion_id: completion.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
} 