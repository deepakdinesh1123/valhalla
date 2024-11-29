import { openai } from '@ai-sdk/openai';
import { streamText,  tool } from 'ai';
import { chatPrompt } from '@/ai/prompt';
import { ExecSpec } from '@/ai/schema';
import {z} from 'zod';
import { executeCode } from '@/lib/execute';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      tools: {
        executeCode: tool({
          description: "Execute the generated code when user asks for it",
          parameters: z.object({
            execSpec: z.string(),
            code: z.string(),
          }),
          execute: async ({ execSpec, code }) => {
            try {
              console.log("exec spec:", execSpec);
              console.log("code:", code);

              // Parse and validate `execSpec` using the schema
              const execSpecSchema = ExecSpec.parse(JSON.parse(execSpec));
              execSpecSchema.code = code;

              // Execute the code and handle the result as an EventSource
              const path = await executeCode(execSpecSchema);
              const source = new EventSource(path);

              source.onmessage = async (event) => {
                const data = JSON.parse(event.data);

                switch (data.status) {
                  case "pending":
                    console.log("Execution is pending.");
                    break;
                  case "scheduled":
                    console.log("Execution has been scheduled.");
                    break;
                  case "completed":
                    console.log("Execution completed.");
                    source.close();

                    // try {
                    //   const flake = await getFlake(data.jobId);
                    //   console.log("Fetched flake:", flake);
                    // } catch (error) {
                    //   console.error("Failed to fetch flake:", error);
                    // }
                    // break;
                  default:
                    console.warn("Unknown status:", data.status);
                    break;
                }
              };

              source.onerror = (error) => {
                console.error("EventSource error:", error);
                source.close();
              };
            } catch (error) {
              console.error("Execution failed:", error);
              throw error;
            }
          },
        }),
      },
      system: chatPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}