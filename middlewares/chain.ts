// middlewares/chain.ts

// Let's say we have three middleware factories: [A, B, C]. The call stack will look like this:

// 1. chain([A, B, C], 0)
//    2. chain([A, B, C], 1)
//       3. chain([A, B, C], 2)
//          4. chain([A, B, C], 3)
//          4. Returns pass-through function
//       3. C(pass-through)
//    2. B(C)
// 1. A(B(C))

import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export type CustomMiddleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
    functions: MiddlewareFactory[],
    index = 0
): CustomMiddleware {
    // Get the middleware at position index in the array
    const current = functions[index];
    // If there is one, call chain with the next index
    if (current) {
        const next = chain(functions, index + 1);
        return current(next); //
    }

    // where there are not more functions to chain, return a
    return (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        return response;
    };
}
