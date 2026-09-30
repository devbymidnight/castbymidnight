import type { MetadataRoute } from 'next';
import { languageUrls } from '@/content/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['en', 'el'].map(language => ({ url: languageUrls[language as 'en' | 'el'], alternates: { languages: languageUrls } }));
}
