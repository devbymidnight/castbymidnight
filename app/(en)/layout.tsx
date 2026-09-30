import Document from '@/components/Document';
export { baseMetadata as metadata } from '@/content/seo';
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
