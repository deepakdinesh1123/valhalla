import { z } from 'zod';

// Define the Zod schema for the environment
const EnvironmentSchema = z.object({
  languageDependencies: z.array(z.string()), // Array of strings
  systemDependencies: z.array(z.string()),   // Array of strings
});

// Define the Zod schema for the execSpec
const ExecSpecSchema = z.object({
  environment: EnvironmentSchema, // Nested environment object
  code: z.string(),               // Code as a string
  language: z.string(),           // Language as a string
});

// Define the Zod schema for the main JSON structure
const MainSchema = z.object({
  message: z.string(),      // message is a string
  code: z.string(),         // code is a string
  execSpec: ExecSpecSchema, // execSpec is an object based on the ExecSpecSchema
});

// Example JSON string (as given in your input)
const jsonString = `{
  "message": "Generated Python code to send a request using curl.",
  "code": "import os\\n\\n# Define the endpoint URL\\nurl = 'https://api.example.com/endpoint'\\n\\n# Define the curl command\\ncurl_command = f'curl -X GET {url}'\\n\\n# Execute the curl command\\nos.system(curl_command)",
  "execSpec": {
    "environment": {
      "languageDependencies": ["requests"],
      "systemDependencies": ["curl"]
    },
    "code": "import os\\n\\n# Define the endpoint URL\\nurl = 'https://api.example.com/endpoint'\\n\\n# Define the curl command\\ncurl_command = f'curl -X GET {url}'\\n\\n# Execute the curl command\\nos.system(curl_command)",
    "language": "python"
  }
}`;

// Parse and validate the JSON
try {
  const parsedData = MainSchema.parse(JSON.parse(jsonString));
  console.log("Parsed data:", parsedData.execSpec.language);
} catch (error) {
  console.error("Validation failed:", error);
}
