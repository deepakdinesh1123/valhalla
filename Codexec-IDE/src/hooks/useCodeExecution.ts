import { useState} from 'react';
import {client} from '@/utils/client';
import { ExecutionWSMessage } from 'tsvalkyrie/resources/executions/types.mjs';
import { ExecutionExecuteParams } from 'tsvalkyrie/resources/index.mjs';

export const useCodeExecution = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const executeCode = async (runData: ExecutionExecuteParams) => {
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
    //   try {
    //     setIsLoading(true);
    //   const execData: ExecutionRequest = {
    //     environment: {
    //     },
    //     code: runData.code,
    //     language: runData.language,
    //     version: runData.version,
    //     max_retries: runData.max_retries,
    //     cmdLineArgs: runData.cmdLineArgs,
    //     compilerArgs: runData.compilerArgs,
    //     command: runData.command,
    //   };
    //   const response = await api.execute(execData);
    //   const eventPath = import.meta.env.VITE_BASE_PATH;
    //   const [eventSource, setEventSource] = useState<EventSource | null>(null);
    //   const source = new EventSource(`${eventPath}${response.data.events}`);
      
    //   setEventSource(source);

    //   source.onmessage = (event) => {
    //     const data = JSON.parse(event.data);

    //     switch (data.status) {
    //       case 'pending':
    //         setTerminalOutput([ 'Waiting for worker']);
    //         break;
    //       case 'scheduled':
    //         setTerminalOutput([ 'Processing...']);
    //         break;
    //       case 'completed':
    //         setTerminalOutput([data.logs || 'No logs available.',]);
    //         setIsLoading(false); 
    //         source.close();
    //         break;
    //       default:
    //         break;
    //     }
    //   };

    //   source.onerror = (error) => {
    //     console.error('EventSource error:', error);
    //     setTerminalOutput((prev) => [...prev, 'EventSource connection error.']);
    //     setIsLoading(false); 
    //     source.close();
    //   };
    // } catch (error) {
    //   console.error('Execution failed:', error);
    //   setTerminalOutput((prev) => [...prev, 'Execution failed.']);
    //   setIsLoading(false); 
    // }
    }
  };

  return { terminalOutput, executeCode, isLoading };
};
