// --- START OF FILE: src/App.tsx ---

import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SignUpFormProvider, useSignUpForm } from './contexts/SignUpContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { MainAppLayout } from './layouts/MainAppLayout';
import { Loader } from 'lucide-react';

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
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
  <symbol id="icon-fire" viewBox="0 0 20 20"><path d="M10 3.5a1.5 1.5 0 0 1 .5 2.915V9.75a.75.75 0 0 1-1.5 0V6.415A1.5 1.5 0 0 1 10 3.5Z" /><path fillRule="evenodd" d="M10 2c-1.101 0-1.976.843-2.09 1.913A3.001 3.001 0 0 0 6.25 7.55v2.117A3.999 3.999 0 0 0 6 11.75c0 1.48.806 2.768 1.981 3.422L6.06 18.25A.75.75 0 0 0 6.75 19h6.5a.75.75 0 0 0 .69-.75l-1.922-3.078A3.999 3.999 0 0 0 14 11.75c0-1.025-.387-1.956-.998-2.683V7.55A3.001 3.001 0 0 0 12.09 3.913C11.976 2.843 11.102 2 10 2Zm0 8.75a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-protein" viewBox="0 0 20 20"><path d="M11.75 3.25a.75.75 0 0 0-1.5 0V7h-3V3.25a.75.75 0 0 0-1.5 0V7h-.75C4.224 7 3.504 7.724 3.504 8.5S4.224 10 5.004 10h1.748l-1.993 5.478A.75.75 0 0 0 5.5 16.25h3.75V20a.75.75 0 0 0 1.5 0v-3.75h3V20a.75.75 0 0 0 1.5 0v-3.75h.75c.78 0 1.504-.724 1.504-1.5S15.784 10 15.004 10h-1.748l1.992-5.478A.75.75 0 0 0 14.5 3.75h-3.75V3.25Z" /></symbol>
  <symbol id="icon-carbs" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.5 3.226a2.25 2.25 0 0 0-2.063.303l-5.5 4.03A2.25 2.25 0 0 0 4.25 9.51v.981c0 .625.277 1.204.749 1.598l5.5 4.03a2.25 2.25 0 0 0 2.812-.001l5.5-4.03a2.25 2.25 0 0 0 .749-1.598v-.981a2.25 2.25 0 0 0-.687-1.951l-5.5-4.03A2.25 2.25 0 0 0 12.5 3.226Zm-1.324 1.34L7.676 7.5l3.5 2.563 3.5-2.563-3.5-2.937ZM6.5 9.088l3.5 2.563v5.098l-3.5-2.563V9.088Zm7 0v5.098l-3.5 2.563V11.65l3.5-2.563Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-fat" viewBox="0 0 20 20"><path d="M10 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /><path fillRule="evenodd" d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-fiber" viewBox="0 0 20 20"><path fillRule="evenodd" d="M15.28 9.116a.75.75 0 0 0-1.06-1.06l-4.22 4.22-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.75-4.75Z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 2a7.5 7.5 0 0 0-6.025 3.503.75.75 0 0 0 .083 1.035l1.25 1.25a.75.75 0 0 0 1.06-.083A5.003 5.003 0 0 1 10 5.5a.75.75 0 0 0 0-1.5A6.5 6.5 0 0 0 3.5 9a.75.75 0 0 0-1.5 0 8.001 8.001 0 0 0 6.25 7.943V17.5a.75.75 0 0 0 1.5 0v-.557A8.002 8.002 0 0 0 18 9a.75.75 0 0 0-1.5 0 6.5 6.5 0 0 1-5.5 5.5.75.75 0 0 0 0 1.5 5.001 5.001 0 0 1-3.417-1.342.75.75 0 0 0-1.035-.083l-1.25 1.25a.75.75 0 0 0 .083 1.035A7.5 7.5 0 0 0 10 18a7.5 7.5 0 0 0 7.488-6.817.75.75 0 0 0-.58-.87L10.25 8.057a.75.75 0 0 0-.832.059L5.602 11.1A.75.75 0 0 0 5.5 12.25v1.018a.75.75 0 0 0 1.5 0V12.5a5 5 0 0 1 3-4.568V6.75a.75.75 0 0 0 .75-.75 3.5 3.5 0 0 1 3.5-3.5.75.75 0 0 0 0-1.5Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-clock" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-servings" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2Z" /><path fillRule="evenodd" d="M10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM11.34 6.157a.75.75 0 0 0-1.23-.908l-3.5 4.5A.75.75 0 0 0 7 10.5h1.25V14a.75.75 0 0 0 1.5 0v-3.5H11a.75.75 0 0 0 .668-.994l-.328-.649Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-curry" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM5 10a1 1 0 0 1 1-1h1.25a.75.75 0 0 0 0-1.5H6a2.5 2.5 0 0 0 0 5h1.25a.75.75 0 0 0 0-1.5H6a1 1 0 0 1-1-1Zm5.25.75a.75.75 0 0 0 0-1.5H9.5a.75.75 0 0 0 0 1.5h.75Zm2.5-.75a.75.75 0 0 1 .75.75 1 1 0 0 1-1 1h-.25a.75.75 0 0 1 0-1.5h.25a1 1 0 0 1 .25.03Zm.97 2.22a.75.75 0 0 0-1.054-1.054L12.25 12.586l-.384-.575a.75.75 0 0 0-1.224.816l.5.75a.75.75 0 0 0 .612.408h.002a.75.75 0 0 0 .614-.408l1.5-2.25Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-vegetable" viewBox="0 0 20 20"><path fillRule="evenodd" d="M15.03 3.22a.75.75 0 0 1 0 1.06l-1.72 1.72h1.94a.75.75 0 0 1 0 1.5h-1.94l1.72 1.72a.75.75 0 1 1-1.06 1.06l-1.72-1.72v1.94a.75.75 0 0 1-1.5 0v-1.94l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72H6.47l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72V6.47L3.69 4.75a.75.75 0 1 1 1.06-1.06l1.72 1.72h1.94L6.69 3.77a.75.75 0 0 1 1.06-1.06l1.72 1.72v-1.94a.75.75 0 0 1 1.5 0v1.94l1.72-1.72a.75.75 0 0 1 1.06 0ZM8.5 8.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" /></symbol>
  <symbol id="icon-chart-line" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3.75-3.75m0 0L11.25 15l3.75-3.75m0 0L20.25 6.75" /></symbol>
  <symbol id="icon-tape-measure" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125m.75 4.275c.618 0 .992.724.725 1.282A7.471 7.471 0 0 0 7.5 19.5a2.25 2.25 0 0 0-2.25 2.25a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75a2.25 2.25 0 0 0-2.25-2.25a7.47 7.47 0 0 0-1.332-1.418V12.75h.75a2.25 2.25 0 0 0 2.25-2.25v-.144c0-.62-.503-1.125-1.125-1.125h-.351a2.253 2.253 0 0 1-.414-.033L12.75 3.03Z" /></symbol>
  <symbol id="icon-camera" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></symbol>
  <symbol id="icon-trophy" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 12.75 9.75V5.625a1.5 1.5 0 0 0-.659-1.322L10.5 2.25 8.25 4.303a1.5 1.5 0 0 0-.659 1.322V9.75A3.375 3.375 0 0 0 5.25 14.25v4.5" /></symbol>
  <symbol id="icon-calendar-days" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></symbol>
  <symbol id="icon-ruler" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.12a2.25 2.25 0 0 0 2.15 2.88h3.286a2.25 2.25 0 0 1 2.15 2.88l-1.125 5.625a2.25 2.25 0 0 0 2.15 2.88h.203a2.25 2.25 0 0 0 2.15-2.88l1.125-5.625a2.25 2.25 0 0 1 2.15-2.88h3.286a2.25 2.25 0 0 0 2.15-2.88l-2.413-7.75a2.25 2.25 0 0 0-2.15-1.588H15M8.25 12H18m-9.75 3H18M3.75 12H6M3.75 6H6m3 0H6.75M9 6.75H6.75m9.75 3h2.25m-2.25 3h2.25m0-3H15m2.25 0h.008v.008H17.25V12Zm0 3h.008v.008H17.25V15Z" /></symbol>
  <symbol id="icon-plus-circle" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></symbol>
  <symbol id="icon-medical-records" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></symbol>
  <symbol id="icon-nutrition-info" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8a5.25 5.25 0 0 0-5.25 5.25h10.5A5.25 5.25 0 0 0 12 8Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6.75" /></symbol>
  <symbol id="icon-address" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></symbol>
  <symbol id="icon-pricing-plans" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></symbol>
  <symbol id="icon-orders" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 5.25a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 5.25a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75A1.75 1.75 0 0 1 4.75 2h14.5A1.75 1.75 0 0 1 21 3.75v16.5A1.75 1.75 0 0 1 19.25 22H4.75A1.75 1.75 0 0 1 3 20.25V3.75Z" /></symbol>
  <symbol id="icon-trash" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.111 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></symbol>
  <symbol id="icon-visa" viewBox="0 0 61 20"><path d="M42.116.083H37.43V19.99h4.432s.21-.05.292-.083c3.393-.87 5.953-4.435 5.953-8.867.001-5.458-2.644-8.79-5.993-8.957ZM22.582 7.131c-.933-3.65-3.833-6.664-8.048-7.048l-4.14.04L0 19.99h5.194l2.476-9.947 1.865 7.37h4.03l2.573-9.75c.592 1.7.567 9.75.567 9.75h4.18l5.03-19.907H22.58Zm11.656-.02L30.26 19.99h4.684l3.978-19.927h-4.684Z" fill="#142688"/></symbol>
  <symbol id="icon-mastercard" viewBox="0 0 32 20"><path d="M22.262 10c0-2.98-1.634-5.54-4.013-6.934a7.358 7.358 0 0 0-8.5 0C7.373 4.46 5.74 7.02 5.74 10s1.633 5.54 4.012 6.934a7.358 7.358 0 0 0 8.5 0c2.38-1.393 4.013-3.954 4.013-6.934Z" fill="#FF5F00"/><path d="M12.14 10c0-3.01 1.276-5.692 3.25-7.39a7.399 7.399 0 0 1 3.252 14.78A7.368 7.368 0 0 1 12.14 10Z" fill="#EB001B"/><path d="M29.093 10a13.646 13.646 0 0 1-2.25 7.373A13.63 13.63 0 0 1 16 19.407a13.632 13.632 0 0 1-10.845-2.034A13.646 13.646 0 0 1 2.907 10c0-3.314.96-6.377 2.938-8.822A13.63 13.63 0 0 1 16 .593a13.632 13.632 0 0 1 10.845 2.034A13.646 13.646 0 0 1 29.093 10Z" fill="#F79E1B" fillOpacity={0.8}/></symbol>
    </svg>
      
      <AuthProvider>
        <ThemeProvider>
          <SignUpFormProvider>
            <div className="bg-peach-50 dark:bg-cocoa-900 text-cocoa-800 dark:text-peach-100 min-h-screen transition-colors duration-300">
              <AppRouter />
            </div>
          </SignUpFormProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;

// --- END OF FILE: App.tsx ---
