import { NextResponse } from 'next/server';

export async function middleware() {
  // This middleware doesn't actually use Supabase, 
  // as we're handling auth in the client components
  // This is just a placeholder for potential future middleware logic
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 