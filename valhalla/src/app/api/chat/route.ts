import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { prompt } from '@/ai/prompt';
import { Response } from '@/ai/schema';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    system: prompt,
    schema: Response,
    prompt: context
  });

//   for await(const partialObject of result.partialObjectStream) {
//     console.log(partialObject);
    
//   }

return result.toTextStreamResponse();
}