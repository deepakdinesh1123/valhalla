import { useState} from 'react';
import {client} from '@/utils/client';
import { ExecutionWSMessage } from 'tsvalkyrie/resources/executions/types.mjs';

export const useCodeExecution = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async (runData: {
    language: string;
    version: string;
    code: string;
    environment: {
      systemDependencies: string[];
      languageDependencies: string[];
      setup: string;
    },
    cmdLineArgs: string;
    input : string;
    compilerArgs: string;
    command: string;    
    
  }) => {
    try {
      setIsLoading(true); 
      console.log(runData);
      console.log(import.meta.env.VITE_PROTOCOL);
      setTerminalOutput(["Loading..."]);
      client.executions.execute(runData)
      .then((res: ExecutionWSMessage) => {
        setTerminalOutput([res.logs || "No logs available."]);
        setIsLoading(false);
        console.log(res);
        
      })
      .catch((err: any) => {
        setTerminalOutput([err.message]);
      });
      
    } catch (error) {
      console.error('Execution failed:', error);
      setTerminalOutput((prev) => [...prev, 'Execution failed.']);
      setIsLoading(false); 
    }
  };

  return { terminalOutput, executeCode, isLoading };
};
