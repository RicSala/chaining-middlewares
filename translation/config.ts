import { LocalePrefix, Pathnames } from 'next-intl/routing';

export const defaultLocale = 'es' as const;
export const locales = ['en', 'es', 'it', 'fr', 'de'] as const;

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';

export type Locale = (typeof locales)[number];

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`;

export const pathnames = {
    '/': '/',
    '/blog': '/blog',
    '/negrita-linkedin': {
        en: '/bold-linkedin',
        es: '/negrita-linkedin',
        it: '/grassetto-linkedin',
        fr: '/gras-linkedin',
        de: '/fett-linkedin',
    },
} satisfies Pathnames<typeof locales>;
