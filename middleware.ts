import { chain } from '@/middlewares/chain';
import { withAuthMiddleware } from '@/middlewares/withAuth';
import { withI18nMiddleware } from '@/middlewares/withIntl';
import { withLoggerMiddleware } from '@/middlewares/withLoggerMiddleware';
import {
    locales,
    localePrefix,
    defaultLocale,
    pathnames,
} from '@/translation/config';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
    locales,
    localePrefix,
    defaultLocale,
    pathnames,
});
export default chain([
    withAuthMiddleware as any,
    withI18nMiddleware,
    withLoggerMiddleware,
]);

export const config = {
    // Skip all paths that should not be internationalized
    matcher: [
        '/((?!api|_next/static|_next/image|images|videos|favicon.ico|robots.txt).*)',
    ],
};
