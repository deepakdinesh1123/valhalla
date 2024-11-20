const prompt = `You generate json of all the words given and map them to thier index return the json of index and word. The response should be in the following typescript snippet:
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

for example if the input give is "x y z" then the response should be:
{
   "0": "x",
   "1": "y",   
   "2": "z"
}

if the input contains a json it is the previous response and if the prompt contains requst to modify the previous response, then use the json to modify the response, else use the prompt to generate the response.

`;

export { prompt };