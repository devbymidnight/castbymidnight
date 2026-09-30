import Document from '@/components/Document';
export { baseMetadata as metadata } from '@/content/seo';
export default function GreekLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="el">{children}</Document>;
}
