import { api } from '@/utils/api';
import { ExecSpec } from '@/ai/schema';

const getFlake = async (jobId: number) => {
    const response = await api.flakeJobIdGet(jobId);
    return response.data.flake;
};

const eventPath = process.env.NEXT_PUBLIC_ODIN_API_URL;

export async function executeCode( runData: {
    language?: string;
    version?: string;
    code: string;
    cmdLineArgs?: string,
    environment: {
      systemDependencies?: string[] ;
      languageDependencies?: string[] ;
      setup?: string
    }
  }): Promise<string> {
    let logs:string[] = [];
    let flake:string = '';

    console.log("execspec in execute is", runData)

    // try {
        const source = api.execute(runData)
        .then((res) => {
            return `${eventPath}${res.data.events}`;
        })
        .catch((err) => {
            console.error("An error occurred:", err);
            return ""; // Provide a fallback value in case of an error
        });
        return source;
        
    //   const response = await api.execute(runData);
      
    //   const source = new EventSource(`${eventPath}${response.data.events}`);

      

    //   source.onmessage = async (event) => {
    //     const data = JSON.parse(event.data);

    //     switch (data.status) {
    //       case 'pending':
    //         break;
    //       case 'scheduled':
    //         break;
    //       case 'completed':
    //         source.close();
    //         logs = data.logs;
    //         try {
    //             flake = await getFlake(response.data.jobId);
    //         } catch (error) {
    //           console.error('Failed to fetch flake:', error);
    //         }
    //         break;
    //       default:
    //         break;
    //     }
    //   };

    //   source.onerror = (error) => {
    //     console.error('EventSource error:', error);
    //     source.close();
    //   };
    // } catch (error) {
    //   console.error('Execution failed:', error);
    // }
    // return { logs, flake}
};
