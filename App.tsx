
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SignUpFormProvider } from './contexts/SignUpContext';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { MainAppLayout } from './layouts/MainAppLayout'; // New Main App Layout
import { Theme, AppRoute } from './types';
import { PRIMARY_COLOR_CLASS } from './constants'; // melon

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-2 rounded-full bg-clay-200 dark:bg-cocoa-700 text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 shadow-md hover:bg-clay-300 dark:hover:bg-cocoa-600 transition-colors z-[1000]`} // Ensure high z-index
      aria-label={theme === Theme.LIGHT ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate auth state
  
  const getInitialRoute = () => {
    const hash = window.location.hash;
    // Basic validation: if hash is just '#' or empty, treat as needing default.
    if (hash && hash !== '#') return hash;
    return '#/signin'; // Default before auth state is known
  };
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute());

  const navigateTo = useCallback((route: AppRoute) => {
    setCurrentRoute(route); // Update React state immediately
    if (window.location.hash !== route) {
      try {
        window.location.hash = route; // Attempt to update URL hash
      } catch (e) {
        console.warn(`Unable to update URL hash to "${route}" due to environment restrictions. Navigation will be internal. Error: ${e}`);
      }
    }
  }, []); // setCurrentRoute from useState is stable and not needed in deps

  useEffect(() => {
    // Handles URL changes from browser back/forward or direct hash modification by user
    const handleHashChange = () => {
      const newHash = window.location.hash;
      // Only update internal state if the hash change is significant and different from current internal route
      if (newHash && newHash !== currentRoute) {
        setCurrentRoute(newHash);
      } else if (!newHash || newHash === '#') { // Hash was cleared or set to bare '#'
        // Fallback to default route based on auth state
        setCurrentRoute(isAuthenticated ? '#/app/home' : '#/signin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Effect for redirecting based on auth state and ensuring initial route consistency.
    // Runs on initial mount and when isAuthenticated or currentRoute changes (to catch desync).
    let targetRoute = currentRoute; 

    if (isAuthenticated) {
      // If authenticated, and current route is not an app route (e.g. #/signin, #/signup, or empty), redirect to home.
      if (!currentRoute.startsWith('#/app')) {
        targetRoute = '#/app/home';
      }
    } else {
      // If not authenticated:
      // Allow #/signup. If on an app route (e.g. #/app/home), redirect to #/signin.
      // If on something else (e.g. empty hash or unexpected), default to #/signin.
      if (currentRoute.startsWith('#/app')) {
        targetRoute = '#/signin';
      } else if (currentRoute !== '#/signup' && currentRoute !== '#/signin') {
         // Handles cases like empty hash after initial load, or any other non-auth route
        targetRoute = '#/signin';
      }
    }

    if (targetRoute !== currentRoute) {
      navigateTo(targetRoute); // This will update currentRoute state and try to set hash.
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, currentRoute, navigateTo]);


  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
    // navigateTo to '#/app/home' will be handled by the useEffect due to isAuthenticated change
  };

  const handleSignUpComplete = () => {
    setIsAuthenticated(true);
    // navigateTo to '#/app/home' will be handled by the useEffect due to isAuthenticated change
  };
  
  const handleSignOut = () => {
    setIsAuthenticated(false);
    // navigateTo to '#/signin' will be handled by the useEffect due to isAuthenticated change
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
          <ThemeToggleButton />
          <AppContent />
        </div>
      </SignUpFormProvider>
    </ThemeProvider>
  );
};

export default App;