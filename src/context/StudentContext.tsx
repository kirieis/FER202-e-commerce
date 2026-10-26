'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types';
import { createClient as createBrowserClient } from '../lib/supabase/client';

export interface StudentContextType {
  student: StudentProfile;
  verifyStudentCard: (data: Partial<StudentProfile>) => void;
  loginStudent: (email: string) => void;
  loginDemoStudent: () => void;
  loginWithGoogle: () => Promise<{ error?: string }>;
  loginWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpWithEmail: (email: string, password: string, profile: Partial<StudentProfile>) => Promise<{ error?: string }>;
  logoutStudent: () => Promise<void>;
}

const emptyStudent: StudentProfile = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  studentId: '',
  isVerified: false,
};

const sampleStudent: StudentProfile = {
  fullName: 'Nguyễn Hoàng Nam',
  email: 'nam.nh2105@sis.hust.edu.vn',
  phone: '0988 123 456',
  university: 'Đại học Bách Khoa Hà Nội (HUST)',
  studentId: '20214589',
  isVerified: true,
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(emptyStudent);

  // 1. Check Supabase Auth session & sync with local storage
  useEffect(() => {
    const supabase = createBrowserClient();

    if (supabase) {
      // Get current user session from Supabase
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          syncUserFromSupabase(user, supabase);
        } else {
          restoreLocalStudent();
        }
      });

      // Listen for auth state changes (e.g. after Google OAuth redirect)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          syncUserFromSupabase(session.user, supabase);
        } else {
          restoreLocalStudent();
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      restoreLocalStudent();
    }
  }, []);

  const restoreLocalStudent = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('unigear_student');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.isVerified === 'boolean') {
            setStudent(parsed);
          }
        } catch {
          // ignore
        }
      }
    }
  };

  const syncUserFromSupabase = async (user: any, supabase: any) => {
    const meta = user.user_metadata || {};
    let profileData: Partial<StudentProfile> = {
      email: user.email || '',
      fullName: meta.full_name || meta.name || user.email?.split('@')[0] || 'Sinh viên',
      isVerified: Boolean(meta.is_verified || user.email?.endsWith('.edu.vn')),
      university: meta.university || (user.email?.endsWith('.edu.vn') ? 'Đại học Bách Khoa (HUST)' : ''),
      studentId: meta.student_id || '',
      phone: meta.phone || '',
      avatarUrl: meta.avatar_url || meta.picture || undefined,
    };

    // Try fetching profile from profiles table if exists
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!error && data) {
        profileData = {
          ...profileData,
          fullName: data.full_name || profileData.fullName,
          university: data.university || profileData.university,
          studentId: data.student_id || profileData.studentId,
          phone: data.phone || profileData.phone,
          isVerified: Boolean(data.is_verified || profileData.isVerified),
          idCardImage: data.id_card_image_url || undefined,
        };
      }
    } catch {
      // ignore
    }

    setStudent((prev) => ({
      ...prev,
      ...profileData,
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && student.email) {
      localStorage.setItem('unigear_student', JSON.stringify(student));
    }
  }, [student]);

  // Real Google OAuth SSO
  const loginWithGoogle = async (): Promise<{ error?: string }> => {
    const supabase = createBrowserClient();
    if (!supabase) {
      return {
        error: 'Chưa cấu hình Supabase! Vui lòng thiết lập NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trong file .env.local hoặc Vercel để đăng nhập Google OAuth thật.',
      };
    }

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      return { error: error.message };
    }
    return {};
  };

  // Real Email / Password Sign In
  const loginWithEmail = async (email: string, password: string): Promise<{ error?: string }> => {
    const supabase = createBrowserClient();
    if (!supabase) {
      loginStudent(email);
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncUserFromSupabase(data.user, supabase);
    }

    return {};
  };

  // Real Email / Password Sign Up
  const signUpWithEmail = async (
    email: string,
    password: string,
    profile: Partial<StudentProfile>
  ): Promise<{ error?: string }> => {
    const supabase = createBrowserClient();
    if (!supabase) {
      verifyStudentCard({
        ...profile,
        email,
      });
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: profile.fullName,
          phone: profile.phone,
          university: profile.university,
          student_id: profile.studentId,
          is_verified: true,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await syncUserFromSupabase(data.user, supabase);
    }

    return {};
  };

  const verifyStudentCard = (data: Partial<StudentProfile>) => {
    setStudent((prev) => ({
      ...prev,
      ...data,
      isVerified: true,
    }));
  };

  const loginStudent = (email: string) => {
    setStudent((prev) => ({
      ...prev,
      email,
      fullName: prev.fullName || 'Nguyễn Hoàng Nam',
      university: prev.university || 'Đại học Bách Khoa Hà Nội (HUST)',
      studentId: prev.studentId || '20214589',
      isVerified: true,
    }));
  };

  const loginDemoStudent = () => {
    setStudent(sampleStudent);
  };

  const logoutStudent = async () => {
    const supabase = createBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setStudent(emptyStudent);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('unigear_student');
    }
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        verifyStudentCard,
        loginStudent,
        loginDemoStudent,
        loginWithGoogle,
        loginWithEmail,
        signUpWithEmail,
        logoutStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
