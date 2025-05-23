import { supabase } from './supabase';

export type Profile = {
  id: string;
  email: string;
  role: string;
  created_at?: string;
};

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { profile: data as Profile | null, error };
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  return { profile: data as Profile | null, error };
}

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  return { profiles: data as Profile[] | null, error };
}

export async function testDatabaseConnection() {
  try {
    // Test database connection with a simple query
    const { data, error } = await supabase
      .from('profiles')
      .select('count()')
      .limit(1);
    
    if (error) {
      return { 
        success: false, 
        message: 'Database connection failed', 
        error 
      };
    }
    
    return { 
      success: true, 
      message: 'Database connection successful',
      data
    };
  } catch (error) {
    return { 
      success: false, 
      message: 'Error testing connection', 
      error 
    };
  }
} 