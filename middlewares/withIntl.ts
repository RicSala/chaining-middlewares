import { CustomMiddleware } from '@/middlewares/chain';
import {
    locales,
    localePrefix,
    defaultLocale,
    pathnames,
} from '@/translation/config';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function withI18nMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        // do i18n stuff
        const pathname = request.nextUrl.pathname;
        const pathnameIsMissingLocale = false;

        const intlMiddleware = createMiddleware({
            locales,
            localePrefix,
            defaultLocale,
            pathnames,
        });

        const intlResponse = intlMiddleware(request);

        return middleware(request, event, intlResponse);
    };
}
