import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { prompt } from '@/ai/prompt';
import { Response } from '@/ai/schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();
  
  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    system: prompt,
    schema: Response,
    prompt: context
  });


  return result.toTextStreamResponse();
}