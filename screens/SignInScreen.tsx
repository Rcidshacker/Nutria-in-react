
import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { SocialLoginButton, GoogleIcon, FacebookIcon, MicrosoftIcon } from '../components/SocialLoginButton';
import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface SignInScreenProps {
  onNavigateToSignUp: () => void;
  onSignInSuccess: () => void;
}

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5 text-cocoa-400"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5 text-cocoa-400"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);


export const SignInScreen: React.FC<SignInScreenProps> = ({ onNavigateToSignUp, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Simulate successful login for any non-empty credentials for testing, or use specific ones.
      // if (email === 'user@example.com' && password === 'password') {
      if (email && password) { // Simplified success for demo
        onSignInSuccess();
      } else {
        setError('Invalid credentials. Try any email/password.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const iconColorClass = theme === Theme.DARK ? 'text-clay-300' : 'text-cocoa-500';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-peach-100 dark:bg-cocoa-900 p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-cocoa-800 shadow-xl rounded-xl p-8">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl font-bold text-center text-cocoa-800 dark:text-peach-100 mb-6">Welcome Back!</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignIn}>
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            icon={<EmailIcon className={`w-5 h-5 ${iconColorClass}`} />}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon={<LockIcon className={`w-5 h-5 ${iconColorClass}`} />}
          />
          <div className="text-right mb-6">
            <Button variant="link" type="button" className="text-sm" onClick={() => alert('Forgot password functionality not implemented.')}>
              Forgot Password?
            </Button>
          </div>
          <Button type="submit" fullWidth isLoading={isLoading}>Sign In</Button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-clay-300 dark:border-cocoa-600" />
          <span className="mx-4 text-sm text-cocoa-500 dark:text-cocoa-400">OR</span>
          <hr className="flex-grow border-clay-300 dark:border-cocoa-600" />
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <SocialLoginButton provider="Google" icon={<GoogleIcon />} />
          <SocialLoginButton provider="Facebook" icon={<FacebookIcon />} />
          <SocialLoginButton provider="Microsoft" icon={<MicrosoftIcon />} />
        </div>

        <p className="text-center text-sm text-cocoa-600 dark:text-cocoa-400">
          Don't have an account?{' '}
          <Button variant="link" type="button" onClick={onNavigateToSignUp} className="font-semibold">
            SIGN UP
          </Button>
        </p>
      </div>
    </div>
  );
};