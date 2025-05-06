import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                KAPS
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700">
                Home
              </Link>
              {user && (
                <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700">
                  Dashboard
                </Link>
              )}
              <Link href="/test-db" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700">
                Test DB
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleSignOut}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                href="/auth" 
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 