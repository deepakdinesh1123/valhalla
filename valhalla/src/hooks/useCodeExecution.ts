import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

export const useCodeExecution = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [flakeOutput, setFlakeOutput] = useState<string[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isOutputLoading, setisOutputLoading] = useState(true);
  const eventPath = process.env.NEXT_PUBLIC_API_URL;

  const getFlake = async (jobId: number) => {
    const response = await api.flakeJobIdGet(jobId);
    return response.data.flake;
  };

  const executeCode = async (runData: {
    language: string;
    version: string;
    code: string;
    environment: {
      systemDependencies: string[];
      languageDependencies: string[];
    }
  }) => {
    try {
      setisOutputLoading(true); 
      const response = await api.execute(runData);
      
      const source = new EventSource(`${eventPath}${response.data.events}`);
      console.log(source);

      setEventSource(source);

      source.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        switch (data.status) {
          case 'pending':
            setTerminalOutput(['Waiting for worker']);
            break;
          case 'scheduled':
            setTerminalOutput(['Processing...']);
            break;
          case 'completed':
            setisOutputLoading(false); 
            source.close();
            setTerminalOutput([data.logs || 'No logs available.']);
            try {
              const flake = await getFlake(response.data.jobId);
              setFlakeOutput([flake]);
            } catch (error) {
              console.error('Failed to fetch flake:', error);
              setTerminalOutput((prev) => [...prev, 'Failed to fetch flake.']);
            }
            break;
          default:
            break;
        }
      };

      source.onerror = (error) => {
        console.error('EventSource error:', error);
        setTerminalOutput((prev) => [...prev, 'EventSource connection error.']);
        setisOutputLoading(false); 
        source.close();
      };
    } catch (error) {
      console.error('Execution failed:', error);
      setTerminalOutput((prev) => [...prev, 'Execution failed.']);
      setisOutputLoading(false); 
    }
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return { terminalOutput, executeCode, isOutputLoading, flakeOutput, setFlakeOutput };
};
