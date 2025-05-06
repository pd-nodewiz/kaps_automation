'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { getProfile, type Profile } from '@/lib/database';
import Header from '@/components/layout/Header';
import type { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserAndProfile() {
      try {
        const currentUser = await getUser();
        if (!currentUser) {
          router.push('/auth');
          return;
        }

        setUser(currentUser);
        
        if (currentUser.id) {
          const { profile, error } = await getProfile(currentUser.id);
          if (!error && profile) {
            setProfile(profile);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserAndProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header user={user} />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <p className="text-lg text-gray-500">Loading...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Dashboard</h2>
              {profile ? (
                <div className="mt-4">
                  <p><span className="font-semibold">Email:</span> {profile.email}</p>
                  <p><span className="font-semibold">Role:</span> {profile.role}</p>
                  <p><span className="font-semibold">User ID:</span> {profile.id}</p>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">Profile data not available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 