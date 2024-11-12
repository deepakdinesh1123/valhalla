import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { Response } from '@/lib/schema';
import { prompt } from '@/ai/prompt';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: Response,
    prompt: prompt,
    messages,
  });

  try {
    Response.parse(result);
  }
  catch (error) {
    console.log(error);
  };
}