import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test database connection by querying system time
    const { data, error } = await supabase
      .from('profiles')
      .select('count()')
      .limit(1);

    if (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed', 
        error: error.message,
        details: error
      }, { status: 500 });
    }

    // Check if we can get Supabase version info
    const { data: versionData, error: versionError } = await supabase
      .rpc('version');

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      count: data,
      version: versionData || 'Version check unavailable',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    });
    
  } catch (err) {
    console.error('Error testing connection:', err);
    return NextResponse.json({ 
      success: false, 
      message: 'Error testing connection', 
      error: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
} 