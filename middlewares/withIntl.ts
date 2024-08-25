import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { CustomMiddleware } from './chain';
import {
    defaultLocale,
    localePrefix,
    locales,
    pathnames,
} from '@/translation/config';

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale,
    pathnames,
});

export function withIntlMiddleware(next: CustomMiddleware): CustomMiddleware {
    return async (request: NextRequest) => {
        const response = await intlMiddleware(request);

        if (response) {
            return response;
        }

        return next(request);
    };
}
