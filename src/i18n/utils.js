import es from './es.json';
import en from './en.json';
import ca from './ca.json';

const translations = { es, en, ca };

export function t(key, lang = 'es') {
  const dict = translations[lang] ?? translations['es'];
  return key.split('.').reduce((obj, k) => obj?.[k], dict) ?? key;
}

export const LANGUAGES = ['es', 'en', 'ca'];
export const DEFAULT_LANG = 'es';
