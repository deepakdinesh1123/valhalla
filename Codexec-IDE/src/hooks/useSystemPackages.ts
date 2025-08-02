import { useEffect, useState } from 'react';
import { api } from '@/utils/api';

export const useSystemPackages = (searchString: string) => {
  const [systemPackages, setSystemPackages] = useState<{ name: string; version: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const functionUrl = import.meta.env.VITE_FUNCTION_URL;

  useEffect(() => {
    const fetchSystemPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${functionUrl}/search?q=${searchString}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json(); 
        setSystemPackages(data.results); 
      } catch (err) {
        console.error('Error fetching system packages:', err);
        setError('Failed to fetch system packages.');
      } finally {
        setLoading(false);
      }
    };
  
    if (searchString) {
      fetchSystemPackages();
    }
  }, [searchString, functionUrl]);
  

  return { systemPackages, loading, error };
};
