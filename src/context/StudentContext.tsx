import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types';

export interface StudentContextType {
  student: StudentProfile;
  verifyStudentCard: (data: Partial<StudentProfile>) => void;
  loginStudent: (email: string) => void;
  loginDemoStudent: () => void;
  logoutStudent: () => void;
}

const emptyStudent: StudentProfile = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  studentId: '',
  isVerified: false
};

const sampleStudent: StudentProfile = {
  fullName: 'Nguyễn Hoàng Nam',
  email: 'nam.nh2105@sis.hust.edu.vn',
  phone: '0988 123 456',
  university: 'Đại học Bách Khoa Hà Nội (HUST)',
  studentId: '20214589',
  isVerified: true
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('unigear_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.isVerified === 'boolean') {
          return parsed;
        }
      } catch {
        return emptyStudent;
      }
    }
    return emptyStudent;
  });

  useEffect(() => {
    localStorage.setItem('unigear_student', JSON.stringify(student));
  }, [student]);

  const verifyStudentCard = (data: Partial<StudentProfile>) => {
    setStudent((prev) => ({
      ...prev,
      ...data,
      isVerified: true
    }));
  };

  const loginStudent = (email: string) => {
    setStudent((prev) => ({
      ...prev,
      email,
      fullName: prev.fullName || 'Nguyễn Hoàng Nam',
      university: prev.university || 'Đại học Bách Khoa Hà Nội (HUST)',
      studentId: prev.studentId || '20214589',
      isVerified: true
    }));
  };

  const loginDemoStudent = () => {
    setStudent(sampleStudent);
  };

  const logoutStudent = () => {
    setStudent(emptyStudent);
    localStorage.removeItem('unigear_student');
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        verifyStudentCard,
        loginStudent,
        loginDemoStudent,
        logoutStudent
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
