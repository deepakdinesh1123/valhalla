import { getClient } from './client';


export const checkServerHealth = async (): Promise<boolean> => {
    try {
      const client = await getClient();
      const response = await client.version.retrieve();
      return response.version !== "";
    } catch (error) {
      return false;
    }
  };
  