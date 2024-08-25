//   // And produce a response with the new headers
//     // We are  adding the headers to the response that the backend will return

import { CustomMiddleware } from '@/middlewares/chain';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function withCookieLoggerBuilder(key: string) {
    return function withCookieLogger(
        middleware: CustomMiddleware
    ): CustomMiddleware {
        return async (
            request: NextRequest,
            event: NextFetchEvent,
            response: NextResponse
        ) => {
            const cookie = request.cookies.get(key);
            console.log(cookie?.value);
            return middleware(request, event, response);
        };
    };
}
