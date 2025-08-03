import { useState, useEffect } from 'react';
import {getClient} from '@/utils/client';
import { LanguageListResponse, Language } from 'tsvalkyrie/resources/languages';

export const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
      const client =  await getClient();

        client.languages.list()
        .then((res: LanguageListResponse) => {
          const languageList = res.languages.map((lang) => ({
            id: lang.id,
            name: lang.name,
            extension: lang.extension,
            monaco_language: lang.monaco_language,
            default_code: lang.default_code,
            template: lang.template,
          }));
          setLanguages(languageList);
          if (languageList.length > 0) {
            setSelectedLanguage(languageList[0]);
          }
        })
        .catch((err: any) => {
          console.error('Failed to fetch languages:', err);
        });
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, selectedLanguage, setSelectedLanguage, loading };
};
