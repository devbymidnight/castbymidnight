import { profileSchema } from '@/content/seo';

export default function ProfileSchema({ locale }: { locale: 'en' | 'el' }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema(locale)).replace(/</g, '\\u003c') }} />;
}
