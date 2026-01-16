import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Folder yang gak boleh diintip Google (opsional)
    },
    sitemap: 'https://snip.bgsprayogi.my.id/sitemap.xml',
  };
}