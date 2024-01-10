import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCAL_STORAGE_KEYS } from '../src/lib/enums';

const { LOCALE } = LOCAL_STORAGE_KEYS;
export const useLocale = (jsonPath: string = '') => {
  const { t, i18n } = useTranslation(jsonPath);
  const [currentLocale, setCurrentLocale] = useState<string | null>(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem(LOCALE, lng);
    setCurrentLocale(lng);
  };

  useEffect(() => {
    let initialLocale = localStorage.getItem(LOCALE); // potentially null
    if (!initialLocale) {
      initialLocale = 'it'; // if null set to default 'it'
      localStorage.setItem(LOCALE, initialLocale); // and save it in localStorage
    }
    setCurrentLocale(initialLocale); // set whatever is in localStorage or default 'it'
  }, []);

  const getLanguages = () => i18n.languages;

  const addResourceBundle = (lng: string, ns: string, resources: object) => {
    i18n.addResourceBundle(lng, ns, resources);
  };

  const removeResourceBundle = (lng: string, ns: string) => {
    i18n.removeResourceBundle(lng, ns);
  };

  return {
    t,
    changeLanguage,
    locale: currentLocale,
    getLanguages,
    addResourceBundle,
    removeResourceBundle,
  };
};
