import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const at = request.cookies.get('access_token')?.value;

  if (at) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid`,
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      }
    );

    const body = await response.json();

    if (body.status === 'success') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/login', '/register', '/oauth2/:path*'],
};
