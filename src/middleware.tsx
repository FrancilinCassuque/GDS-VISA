import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUrl } from './lib/getUrl'

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const session = process.env.NODE_ENV === 'production' ? request.cookies.get('__Secure-next-auth.session-token') : request.cookies.get('next-auth.session-token')
  // const sessionP = request.cookies.get('next-auth.session-token')
  // const pathname = request.nextUrl.pathname
  const login = request.nextUrl.pathname == '/user'
  const home = request.nextUrl.pathname == '/'
  const signUp = request.nextUrl.pathname == '/user/create'

  if ((login || signUp) && session) {
    return NextResponse.redirect(new URL(getUrl('/auth/home')))
  }

  if ((!login && !signUp && !home) && (!session)) {
    return NextResponse.redirect(new URL(getUrl('/user')))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|test|terms-and-privacy|about|placeholder).*)'
  ]
}