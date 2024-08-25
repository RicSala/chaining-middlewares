//   // And produce a response with the new headers
//     // We are  adding the headers to the response that the backend will return

import { CustomMiddleware } from '@/middlewares/chain';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function withHeaders(middleware: CustomMiddleware): CustomMiddleware {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const augmentedResponse = response ? response : NextResponse.next();
        augmentedResponse.headers.set(
            'x-middleware-ricardo',
            'header value nuevo'
        );
        return middleware(request, event, augmentedResponse);
    };
}
