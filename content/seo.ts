import type { Metadata } from 'next';
import { profile } from './portfolio';

// Preferred launch hostname, not an assertion that this project has been deployed.
export const siteUrl = 'https://castbymidnight.pages.dev';
export const languageUrls = { en: `${siteUrl}/`, el: `${siteUrl}/el/`, 'x-default': `${siteUrl}/` };
const copy = {
  en: { title: 'MIDNIGHT | Greek & English Esports Caster & Host', description: 'Cypriot esports caster and host Alexandros “Midnight” Georgiou. Greek and English play-by-play, hosting and analysis for League of Legends, VALORANT and TFT.' },
  el: { title: 'MIDNIGHT | Σχολιαστής esports στα ελληνικά και αγγλικά', description: 'Ο Αλέξανδρος «Midnight» Γεωργίου είναι Κύπριος σχολιαστής esports και παρουσιαστής. Περιγραφή αγώνων και παρουσίαση στα ελληνικά και στα αγγλικά για League of Legends, VALORANT και TFT.' },
};
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: [
    { url: '/favicon-32.png?v=mic', type: 'image/png', sizes: '32x32' },
    { url: '/icon.svg?v=mic', type: 'image/svg+xml' },
  ] },
  applicationName: 'Midnight',
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};
export function pageMetadata(locale: 'en' | 'el'): Metadata {
  const { title, description } = copy[locale];
  return {
    title, description,
    alternates: { canonical: languageUrls[locale], languages: languageUrls },
    openGraph: { title, description, type: 'website', siteName: 'Midnight', url: languageUrls[locale], locale: locale === 'el' ? 'el_GR' : 'en_GB', alternateLocale: locale === 'el' ? ['en_GB'] : ['el_GR'], images: [{ url: '/media/photo-05.webp', width: 1440, height: 1440, alt: 'Alexandros “Midnight” Georgiou, esports commentator and host' }] },
    twitter: { card: 'summary_large_image', creator: '@gumidnight', title, description, images: ['/media/photo-05.webp'] },
  };
}
export function profileSchema(locale: 'en' | 'el') {
  const person = {
    '@type': 'Person', '@id': `${siteUrl}/#person`, name: profile.name,
    alternateName: ['Midnight', 'gumidnight', 'Αλέξανδρος Γεωργίου'],
    url: `${siteUrl}/`, image: `${siteUrl}/media/photo-05.webp`,
    jobTitle: 'Esports Commentator and Host', description: copy[locale].description,
    email: profile.email, nationality: { '@type': 'Country', name: 'Cyprus' }, knowsLanguage: ['el', 'en'],
    knowsAbout: ['Esports play-by-play commentary', 'Esports hosting', 'League of Legends', 'VALORANT', 'Teamfight Tactics'],
    sameAs: profile.socials.map(social => social.url),
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Midnight', url: `${siteUrl}/`, inLanguage: ['en', 'el'], publisher: { '@id': person['@id'] } },
      { '@type': 'ProfilePage', '@id': `${languageUrls[locale]}#profile`, url: languageUrls[locale], name: copy[locale].title, inLanguage: locale, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: person },
      { '@type': 'Service', '@id': `${siteUrl}/#commentary-hosting`, name: 'Esports commentary and hosting', serviceType: ['Play-by-play commentary', 'Esports hosting', 'Colour commentary', 'Analyst desk', 'Live interviews'], provider: { '@id': person['@id'] }, areaServed: [{ '@type': 'Country', name: 'Cyprus' }, { '@type': 'Country', name: 'Greece' }], url: `${languageUrls[locale]}#contact` },
    ],
  };
}
