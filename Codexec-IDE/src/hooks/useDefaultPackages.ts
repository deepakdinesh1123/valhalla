import { useCallback, useEffect, useState } from 'react';
import { api } from '@/utils/api';


export const useDefaultPackages = (selectedLanguage: string) => {
  const [defaultSystemPackages, setDefaultSystemPackages] = useState<{ name: string; version: string }[]>([]);
  const [defaultLanguagePackages, setDefaultLanguagePackages] = useState<{ name: string; version: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const functionUrl = import.meta.env.VITE_FUNCTION_URL;


  useEffect(() => {
    const fetchSystemPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${functionUrl}/search?q=git`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json(); 
        setDefaultSystemPackages(data.results);
      } catch (err) {
        console.error('Error fetching system packages:', err);
        setError('Failed to fetch system packages.');
      } finally {
        setLoading(false);
      }
    };
    fetchSystemPackages();
  }, []);

  const fetchLanguagePackages = useCallback(async () => {
    if (!selectedLanguage) return;
    try {
      const response = await api.fetchLanguagePackages(selectedLanguage);
      setDefaultLanguagePackages(response.data.packages);
    } catch (error) {
      console.error('Failed to fetch LanguagePackages:', error);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    fetchLanguagePackages();
  }, [fetchLanguagePackages, selectedLanguage]);

  return { defaultSystemPackages, defaultLanguagePackages, loading, error };
};