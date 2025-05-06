'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import Header from '@/components/layout/Header';
import type { User } from '@supabase/supabase-js';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-blue-600">KAPS Automation</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl">
                A simple Next.js application with Supabase authentication and database integration.
              </p>
              <div className="mt-10">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <div className="space-x-4">
                    <Link
                      href="/auth"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/admin/setup"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      Admin Setup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
