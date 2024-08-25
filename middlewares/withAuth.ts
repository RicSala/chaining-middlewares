import { CustomMiddleware } from '@/middlewares/chain';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

const isAppgRegex = RegExp(/(\/)app(\/|$)/);

// const isAuth = RegExp(/^\/auth/);

const isProtectecPage = (pathname: string) => {
    // Add here more conditions if needed
    return isAppgRegex.test(pathname);
    // || isAuth.test(pathname);
};

export function withAuthMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (!isProtectecPage(request.nextUrl.pathname)) {
            console.log('path', request.nextUrl.pathname);
            console.log('is not protected!');
            return middleware(request, event, response); // intMiddleware returns a response, so it must be the last middleware
        }
        return (
            // `withAuth` augments your `Request` with the user's token.
            (
                withAuth(
                    // Note that this callback is only invoked if
                    // the `authorized` callback has returned `true`
                    // and not for pages listed in `pages`.
                    (req) => middleware(req, event, response),

                    {
                        // Matches the pages config in `[...nextauth]`
                        callbacks: {
                            async authorized({ req, token }) {
                                return token ? true : false;
                            },
                        },
                        pages: {
                            signIn: '/auth/signin',
                            error: '/auth/error',
                        },
                    }
                ) as any
            )(request, event)
        );
    };
}

// // Create a response object to pass down the chain
// const response = NextResponse.next();

// const token = await getToken({ req: request });

// // @ts-ignore
// request.nextauth = request.nextauth || {};
// // @ts-ignore
// request.nextauth.token = token;
// const pathname = request.nextUrl.pathname;

// // const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
// //     ...i18n.locales,
// // ]);

// const protectedPathsWithLocale: any[] = [];

// if (!token && protectedPathsWithLocale.includes(pathname)) {
//     const signInUrl = new URL('/api/auth/signin', request.url);
//     signInUrl.searchParams.set('callbackUrl', pathname);
//     return NextResponse.redirect(signInUrl);
// }
