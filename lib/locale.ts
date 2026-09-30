export type Locale = 'en' | 'el';
export const localeCookieName = 'midnight_language';
export const localePath: Record<Locale, string> = { en: '/', el: '/el/' };

export function readLocale(cookie: string): Locale | null {
  const value = cookie.split(';').map(part => part.trim()).find(part => part.startsWith(`${localeCookieName}=`))?.slice(localeCookieName.length + 1);
  return value === 'en' || value === 'el' ? value : null;
}

export function languageCookie(locale: Locale | null, secure: boolean): string {
  return `${localeCookieName}=${locale ?? ''}; Path=/; Max-Age=${locale ? 31536000 : 0}; SameSite=Lax${secure ? '; Secure' : ''}`;
}

export function preferredDestination(pathname: string, cookie: string, hash = ''): string | null {
  // English is the first-visit default. Only an explicit, saved choice can change it.
  // Explicit Greek links remain Greek, regardless of a previous English preference.
  return pathname === '/' && readLocale(cookie) === 'el' ? `/el/${hash}` : null;
}
