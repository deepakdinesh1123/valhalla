import { useState, useEffect, useCallback } from 'react';
// import { api } from '@/utils/api';
// import { LanguageVersion } from '@/api-client';
import { getClient } from '@/utils/client';
import { LanguageVersion} from 'tsvalkyrie/resources/language-versions.mjs';
import { LanguageRetrieveVersionsResponse } from 'tsvalkyrie/resources/languages';

const client  = await getClient();
export const useLanguageVersions = (languageId: number) => {
  const [languageVersions, setLanguageVersions] = useState<LanguageVersion[]>([]);
  const [selectedLanguageVersion, setSelectedLanguageVersion] = useState<LanguageVersion | null>(null);

  const fetchLanguageVersions = useCallback(async () => {
    if (!languageId) return; 

    try {
      // const response = await api.getAllVersions(languageId);
      client.languages.retrieveVersions(languageId)
      .then((res: LanguageRetrieveVersionsResponse) => {
        const LanguageVersionList = res.languageVersions.map((lang) => ({
          language_id: lang.language_id,
          version: lang.version,
          nix_package_name: lang.nix_package_name,
          template: lang.template,
          search_query: lang.search_query,
          default_version: lang.default_version,
          id: lang.id,
        }));
        setLanguageVersions(LanguageVersionList);
        setSelectedLanguageVersion(LanguageVersionList[0]);
      })
      .catch((err: any) => {
        console.error('Failed to fetch LanguageVersions:', err);
      });
      

    } catch (error) {
      console.error('Failed to fetch LanguageVersions:', error);
    }
  }, [languageId]); 

  useEffect(() => {
    fetchLanguageVersions();
  }, [fetchLanguageVersions]);

  return { languageVersions, selectedLanguageVersion, setSelectedLanguageVersion, refetch: fetchLanguageVersions };
};