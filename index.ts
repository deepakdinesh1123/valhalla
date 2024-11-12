import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamObject, streamText } from 'ai';
import dotenv from 'dotenv';
import * as readline from 'node:readline/promises';
import { prompt } from './prompt';
import { Response } from './schema';

dotenv.config();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: CoreMessage[] = [];

async function main() {
  while (true) {
    const userInput = await terminal.question('You: ');

    messages.push({ role: 'user', content: userInput });

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      system: prompt,
      schema: Response,
      messages,
    });

    let fullResponse = '';
    process.stdout.write('\nAssistant: ');
    for await (const delta of result.textStream) {
      fullResponse += delta;
      process.stdout.write(delta);
    }
    process.stdout.write('\n\n');

    messages.push({ role: 'assistant', content: fullResponse });
  }
}

main().catch(console.error);