import { z } from 'zod';


// Main schema
const JsonSpec = z.object({
  index: z.number(),
  word: z.string(),
});

const Response = z.object({
    message: z.string(),
    json: JsonSpec
});

export {  JsonSpec, Response };

