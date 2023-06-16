import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // TODO: Protected Route 로직 추가 in Login, Register 페이지
  const at = request.cookies.get('access_token')?.value;

  if (at) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
    );

    const { status } = await response.json();

    if (status === 'success') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/login', '/register'],
};
