//   // And produce a response with the new headers
//     // We are  adding the headers to the response that the backend will return

import { CustomMiddleware } from '@/middlewares/chain';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function withCookies(middleware: CustomMiddleware): CustomMiddleware {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const augmentedResponse = response ? response : NextResponse.next();
        augmentedResponse.cookies.set('Ric2', 'This is a test!');
        return middleware(request, event, augmentedResponse);
    };
}
