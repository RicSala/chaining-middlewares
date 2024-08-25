import { CustomMiddleware } from '@/middlewares/chain';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function withLoggerMiddleware(
    middleware: CustomMiddleware
): CustomMiddleware {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        console.log('pathName from middleware', request.nextUrl.pathname);

        return middleware(request, event, response);
    };
}
