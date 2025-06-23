// --- START OF FILE: App.tsx ---

import React, { useState } from 'react'; // FIX: Imported useState
import { ThemeProvider } from './contexts/ThemeContext';
import { SignUpFormProvider, useSignUpForm } from './contexts/SignUpContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { MainAppLayout } from './layouts/MainAppLayout';
import { Loader } from 'lucide-react';
// FIX: Removed unused User import

const AppRouter: React.FC = () => {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  const { resetFormData } = useSignUpForm();
  
  const [showSignUp, setShowSignUp] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-melon-500" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <MainAppLayout
        key={user.id}
        user={user} 
        onSignOut={() => {
          resetFormData();
          logout();
        }}
      />
    );
  }
  
  if (showSignUp) {
    return (
      <SignUpScreen 
        onSignUpComplete={async () => {
          // After signing up, we need to log in to get the user data
          // A better UX might automatically log them in, but for now, we'll send them to sign in.
          setShowSignUp(false);
        }} 
        onNavigateToSignIn={() => setShowSignUp(false)} 
      />
    );
  }

  return (
    <SignInScreen
      onSignIn={login}
      onNavigateToSignUp={() => setShowSignUp(true)}
    />
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SignUpFormProvider>
          <div className="bg-peach-50 dark:bg-cocoa-900 text-cocoa-800 dark:text-peach-100 min-h-screen transition-colors duration-300">
            <AppRouter />
          </div>
        </SignUpFormProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;

// --- END OF FILE: App.tsx ---