// --- START OF FILE App.tsx ---

import React, { useState, useEffect, useCallback } from 'react';
// FIX: Removed unused 'useTheme' import
import { ThemeProvider } from './contexts/ThemeContext';
import { SignUpFormProvider, useSignUpForm } from './contexts/SignUpContext';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { MainAppLayout } from './layouts/MainAppLayout';
// FIX: Removed unused 'Theme' type import
import { AppRoute } from './types'; 
// FIX: Removed unused constant import
// import { PRIMARY_COLOR_CLASS } from './constants'; 

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const getInitialRoute = () => {
    const hash = window.location.hash;
    if (hash && hash !== '#') return hash;
    return '#/signin';
  };
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute());
  
  const { resetFormData } = useSignUpForm();

  const navigateTo = useCallback((route: AppRoute) => {
    setCurrentRoute(route);
    if (window.location.hash !== route) {
      window.location.hash = route;
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash && newHash !== currentRoute) {
        setCurrentRoute(newHash);
      } else if (!newHash || newHash === '#') {
        setCurrentRoute(isAuthenticated ? '#/app/home' : '#/signin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    let targetRoute = currentRoute; 
    if (isAuthenticated) {
      if (!currentRoute.startsWith('#/app')) {
        targetRoute = '#/app/home';
      }
    } else {
      if (currentRoute.startsWith('#/app')) {
        targetRoute = '#/signin';
      } else if (currentRoute !== '#/signup' && currentRoute !== '#/signin') {
        targetRoute = '#/signin';
      }
    }
    if (targetRoute !== currentRoute) {
      navigateTo(targetRoute);
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, currentRoute, navigateTo]);

  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignUpComplete = () => {
    setIsAuthenticated(true);
  };
  
  const handleSignOut = () => {
    resetFormData();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    if (currentRoute === '#/signup') {
      return <SignUpScreen 
                onSignUpComplete={handleSignUpComplete} 
                onNavigateToSignIn={() => navigateTo('#/signin')} 
             />;
    }
    return <SignInScreen 
              onNavigateToSignUp={() => navigateTo('#/signup')} 
              onSignInSuccess={handleSignInSuccess} 
           />;
  }

  return <MainAppLayout currentRoute={currentRoute} onSignOut={handleSignOut} navigateTo={navigateTo} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SignUpFormProvider>
        <div className="bg-peach-100 dark:bg-cocoa-900 text-cocoa-800 dark:text-peach-100 min-h-screen transition-colors duration-300">
          <AppContent />
        </div>
      </SignUpFormProvider>
    </ThemeProvider>
  );
};

export default App;

// --- END OF FILE App.tsx ---