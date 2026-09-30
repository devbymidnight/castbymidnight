import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@/app/globals.css';
import { SavedLanguageRedirect } from '@/components/LanguagePreference';

export default function Document({ children, lang }: Readonly<{ children: React.ReactNode; lang: 'en' | 'el' }>) {
  return <html lang={lang}><body>{children}<SavedLanguageRedirect/></body></html>;
}
