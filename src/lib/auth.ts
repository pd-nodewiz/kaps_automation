import { supabase } from './supabase';
import { type User } from '@supabase/supabase-js';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

export async function createAdminUser(email: string, password: string) {
  // Sign up the user
  const { data, error } = await signUp(email, password);
  
  if (error) {
    return { error };
  }

  // Here you would typically set admin role in your database
  // For example, insert a record in an 'admins' or 'roles' table
  // This is a simplified version
  const { error: roleError } = await supabase
    .from('profiles')
    .insert({
      id: data.user?.id,
      role: 'admin',
      email: email,
    });

  return { data, error: roleError };
} 