// middlewares/withAuthMiddleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { CustomMiddleware } from './chain';
import { withAuth } from 'next-auth/middleware';

const authMiddleware = withAuth(() => NextResponse.next(), {
    callbacks: {
        async authorized({ req, token }) {
            return token ? true : false;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});

export function withAuthMiddleware(
    middleware: CustomMiddleware // Takes a middleware...
    // ...and returns a middleware that adds some logic on top of it
): CustomMiddleware {
    // It's returning a function (middleware)
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.redirect(
                new URL('/api/auth/signin', request.url)
            );
        }

        const authMiddleware = withAuth({
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
        });

        return middleware(request, event, response);
    };
}
