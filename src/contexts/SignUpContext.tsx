// --- START OF FILE contexts/SignUpContext.tsx ---

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SignUpFormData } from '../types';

interface SignUpContextType {
  formData: SignUpFormData;
  updateFormData: (data: Partial<SignUpFormData>) => void;
  resetFormData: () => void;
}

const initialFormData: SignUpFormData = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  agreedToTerms: false,
  age: '',
  height: '',
  weight: '',
  dietPreference: '',
  activityLevel: '',
  gender: '',
  fitnessGoal: '',
  healthCondition: '',
  region: '',
  // FIX: Changed default plan from 'free' to 'nutria' to match the type definition
  plan: 'nutria',
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);

  const updateFormData = (data: Partial<SignUpFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <SignUpContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpForm = (): SignUpContextType => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error('useSignUpForm must be used within a SignUpFormProvider');
  }
  return context;
};

// --- END OF FILE contexts/SignUpContext.tsx ---
