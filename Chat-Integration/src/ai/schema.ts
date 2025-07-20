import { z } from 'zod';

// ExecutionEnvironmentSpec schema
const ExecutionEnvironmentSpecSchema = z.object({
  languageDependencies: z.array(z.string()).default(["bash"]),
  systemDependencies: z.array(z.string()).default(["bash"]),
  setup: z.string().optional(),
});

// Main schema
const ExecSpec = z.object({
  environment: ExecutionEnvironmentSpecSchema,
  code: z.string(),
  language: z.string().default("bash"),
  version: z.string().optional(),
  cmdLineArgs: z.string().optional(),
});

const Response = z.object({
    message: z.string(),
    code: z.string(),
    execSpec: ExecSpec
});

export { ExecutionEnvironmentSpecSchema, ExecSpec, Response };

