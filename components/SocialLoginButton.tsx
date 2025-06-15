// --- START OF FILE components/SocialLoginButton.tsx ---

import React from 'react';
// UPDATED: Only importing Facebook as it's a suitable brand mark from the library
import { Facebook } from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'Google' | 'Facebook' | 'Microsoft';
  icon: React.ReactNode; 
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, icon }) => {
  return (
    <button
      type="button"
      title={`Sign in with ${provider}`}
      className="p-2 border border-clay-300 dark:border-cocoa-600 rounded-full hover:bg-clay-100 dark:hover:bg-cocoa-700 transform transition-all duration-150 ease-in-out hover:scale-110 active:scale-100"
      onClick={() => alert(`${provider} login is not implemented.`)}
    >
      {icon}
    </button>
  );
};

// --- ICONS ---

// FIX: Restored the original, correct Google logo SVG
export const GoogleIcon: React.FC<{ className?: string }> = ({className = "w-6 h-6"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.18,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.18,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.18,22C17.6,22 21.54,18.33 21.54,12.81C21.54,11.76 21.35,11.1 21.35,11.1Z" />
  </svg>
);

// Lucide's Facebook icon is the official 'f' logo, which is perfect.
export const FacebookIcon: React.FC<{ className?: string }> = ({className = "w-6 h-6"}) => (
  <Facebook className={className} />
);

// Microsoft's logo is geometric, so the manual SVG remains the best choice.
export const MicrosoftIcon: React.FC<{ className?: string }> = ({className = "w-6 h-6"}) => (
 <svg className={className} viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill="#F25022" d="M1 1H10.5V10.5H1z"/>
  <path fill="#00A4EF" d="M1 12.5H10.5V22H1z"/>
  <path fill="#7FBA00" d="M12.5 1H22V10.5H12.5z"/>
  <path fill="#FFB900" d="M12.5 12.5H22V22H12.5z"/>
</svg>
);


// --- END OF FILE components/SocialLoginButton.tsx ---