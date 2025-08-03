import { useState } from 'react';
import { getClient } from '@/utils/client';
import { ExecutionWSMessage } from 'tsvalkyrie/resources/executions/types.mjs';
import { ExecutionExecuteParams } from 'tsvalkyrie/resources/index.mjs';

export const useCodeExecution = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async (runData: ExecutionExecuteParams) => {
    try {
      setIsLoading(true); 
      setTerminalOutput(["Loading..."]);

      const client = await getClient(); // ✅ moved inside
      const res: ExecutionWSMessage = await client.executions.execute(runData);

      setTerminalOutput([res.logs || "No logs available."]);
      console.log(res);
    } catch (err: any) {
      console.error('Execution failed:', err);
      setTerminalOutput([err.message ?? 'Execution failed.']);
    } finally {
      setIsLoading(false);
    }
  };

  return { terminalOutput, executeCode, isLoading };
};
