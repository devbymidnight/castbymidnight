'use client';
import { useEffect } from 'react';
import { languageCookie, localePath, preferredDestination, type Locale } from '@/lib/locale';

function saveChoice(locale: Locale | null) {
  try { document.cookie = languageCookie(locale, location.protocol === 'https:'); } catch { /* Links still work when cookies are blocked. */ }
}

export function LanguageLink({ locale, children, className }: { locale: Locale; children: React.ReactNode; className?: string }) {
  return <a href={localePath[locale]} hrefLang={locale} lang={locale} className={className} onClick={event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    saveChoice(locale);
  }}>{children}</a>;
}

export function SavedLanguageRedirect() {
  useEffect(() => {
    try {
      const destination = preferredDestination(location.pathname, document.cookie, location.hash);
      if (destination) location.replace(destination);
    } catch { /* English remains the default if cookies cannot be read. */ }
  }, []);
  return null;
}
