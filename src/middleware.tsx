
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUrl } from './lib/getUrl'

export default async function middleware(request: NextRequest) {
  const session = process.env.NODE_ENV === 'production'
    ? request.cookies.get('__Secure-next-auth.session-token')
    : request.cookies.get('next-auth.session-token')

  const { pathname } = request.nextUrl

  // Rotas públicas que não exigem sessão
  const publicPaths = [
    '/',
    '/user',
    '/user/create',
    '/test',
    '/service',
    '/terms-and-privacy',
    '/about',
    '/contato',
    '/confirmacao',
    '/not-found',
    'opengraph-image'
  ]
  // console.log('pathname:', pathname)
  // console.log('session:', session)

  // Se for rota pública, segue sem redirecionar
  if (publicPaths.includes(pathname)) {
    if ((pathname === '/user' || pathname === '/user/create') && session) {
      // return NextResponse.redirect(new URL(getUrl('/home')))
      return NextResponse.redirect(new URL('/auth/home', request.nextUrl.origin))

    }
    return NextResponse.next()
  }

  // Qualquer outra rota precisa de sessão
  if (!session) {
    // return NextResponse.redirect(new URL(getUrl('/entrar')))
    return NextResponse.redirect(new URL('/user', request.nextUrl.origin))

  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/|favicon.ico|images|placeholder|opengraph-image|not-found).*)'
  ]
}
