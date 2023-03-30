import type { NextRequest } from 'next/server';
// import middleware from 'lib/middleware';

// // eslint-disable-next-line
// export default async function (req: NextRequest, ev: NextFetchEvent) {
//   return middleware(req, ev);
// }

export const config = {
  // Exclude Sitecore editing API routes
  matcher: ['/', '/((?!api/editing/).*)'],
};


import { NextResponse } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {


  if (request.nextUrl.pathname.startsWith('/post')) {
    if (request.cookies.get("UserToken") != '' && request.cookies.get("UserToken") != null)
      return;
    else {
      response = NextResponse.next() && NextResponse.rewrite(new URL('/login', request.url));
      response.cookies?.set("routeToUrl", request.nextUrl.pathname, { path: "/", httpOnly: false });
      // return NextResponse.rewrite(new URL('/login', request.url))
      return response;
    }
  }
  return;
}
