'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { getUser } from '@/lib/auth';
import type { User } from '@supabase/supabase-js';

export default function TestDbConnection() {
  const [user, setUser] = useState<User | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [responseData, setResponseData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load user
    getUser().then(currentUser => {
      setUser(currentUser);
    }).catch(error => {
      console.error('Error fetching user:', error);
    });

    // Test database connection
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('loading');
    setErrorMessage(null);
    
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      
      setResponseData(data);
      setConnectionStatus(data.success ? 'success' : 'error');
      
      if (!data.success) {
        setErrorMessage(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to test connection');
      console.error('Error testing connection:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Database Connection Test</h2>
              
              <div className="mb-4">
                <button
                  onClick={testConnection}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Test Connection
                </button>
              </div>
              
              {connectionStatus === 'loading' && (
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded">
                  Testing connection...
                </div>
              )}
              
              {connectionStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-100 rounded">
                  <p className="text-green-700 font-medium">✅ Connection Successful!</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">Supabase URL: {responseData?.supabaseUrl || 'Not available'}</p>
                    {responseData?.version && (
                      <p className="text-sm text-gray-600">Version: {responseData.version}</p>
                    )}
                  </div>
                  <pre className="mt-4 bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                </div>
              )}
              
              {connectionStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-100 rounded">
                  <p className="text-red-700 font-medium">❌ Connection Failed</p>
                  {errorMessage && (
                    <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
                  )}
                  {responseData && (
                    <pre className="mt-4 bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(responseData, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Troubleshooting Tips:</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>Verify your Supabase URL and anon key in .env.local are correct</li>
                  <li>Check if your Supabase project is active and running</li>
                  <li>Ensure the 'profiles' table has been created in your database</li>
                  <li>Check if RLS (Row Level Security) policies are configured correctly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 