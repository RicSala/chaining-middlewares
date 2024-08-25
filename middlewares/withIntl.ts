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

        const mergedResponse = mergeResponses(response, intlResponse);

        return middleware(request, event, mergedResponse);
    };
}

function mergeResponses(
    original: NextResponse | undefined,
    intl: NextResponse
): NextResponse {
    // Start with the intl response
    const mergedResponse = intl;
    if (!original) return intl;

    // Copy headers from the original response, but don't overwrite existing ones
    original.headers.forEach((value, key) => {
        if (!mergedResponse.headers.has(key)) {
            mergedResponse.headers.set(key, value);
        }
    });

    // Copy cookies from the original response
    original.cookies.getAll().forEach((cookie) => {
        if (!mergedResponse.cookies.has(cookie.name)) {
            mergedResponse.cookies.set(cookie.name, cookie.value);
        }
    });

    return mergedResponse;
}
