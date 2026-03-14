/**
 * i18n helpers — language detection, type definitions, and translation loader.
 *
 * Usage in Astro pages:
 *   const lang = getLang(Astro.cookies);
 *   const t = useTranslations(lang);
 *   // then use t.nav.home, t.hero.summary, etc.
 */
import type { AstroCookies } from 'astro';
import { pt } from './pt';
import { en } from './en';
import { es } from './es';

export type Lang = 'pt' | 'en' | 'es';

export const SUPPORTED_LANGS: Lang[] = ['pt', 'en', 'es'];
export const DEFAULT_LANG: Lang = 'pt';

const translations = { pt, en, es } as const;

/**
 * Read the current language from the `lang` cookie.
 * Falls back to DEFAULT_LANG if the cookie is absent or invalid.
 */
export function getLang(cookies: AstroCookies): Lang {
  const value = cookies.get('lang')?.value;
  if (value && SUPPORTED_LANGS.includes(value as Lang)) {
    return value as Lang;
  }
  return DEFAULT_LANG;
}

/**
 * Return the full translation object for a given language.
 */
export function useTranslations(lang: Lang) {
  return translations[lang];
}
