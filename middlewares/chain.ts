import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export type CustomMiddleware = (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

// MiddlewareFactory are functions that, given a middleware, return that middleware again...
// ...but adding some functionality before. For example, check the "withLogger"
// Given a middleware, returns a middlware that first console.logs and then call the given middleware
type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
    functions: MiddlewareFactory[],
    index = 0
): CustomMiddleware {
    const current = functions[index]; // the current middleware of the "queue"

    if (current) {
        const next = chain(functions, index + 1); // The next middleware (that is comprised by all the rest, but let's "abstract" that idea)
        return current(next); // we return current with next as argument, so current does its thing, and moves to the next
    }

    // REVIEW: We have to be careful not to use two middlewares that create response
    // This is the last one middleware, the one that is called if nothing before shortcircuits it.
    return (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        return response;
    };
}
