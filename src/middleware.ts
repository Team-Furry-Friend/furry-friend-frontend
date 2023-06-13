import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO: Protected Route 로직 추가 in Login, Register 페이지
}

export const config = {
  matcher: ['/login', '/register'],
};
