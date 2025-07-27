// --- START OF FILE: screens/SignInScreen.tsx ---

import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Mail, LockKeyhole } from 'lucide-react';
import { SocialLoginButton, GoogleIcon, FacebookIcon, MicrosoftIcon } from '../components/SocialLoginButton'; 

interface SignInScreenProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onNavigateToSignUp: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setIsLoading(true);
    
    try {
      await onSignIn(email, password);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-peach-100 dark:bg-cocoa-900 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white dark:bg-cocoa-800 shadow-xl rounded-xl p-8">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl font-bold text-center text-cocoa-800 dark:text-peach-100 mb-6">Welcome Back!</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSignIn}>
          <Input
            id="email" label="Email Address" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" required
            icon={<Mail className="w-5 h-5 text-cocoa-400" />}
          />
          <Input
            id="password" label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" required
            icon={<LockKeyhole className="w-5 h-5 text-cocoa-400" />}
          />
          <div className="text-right mb-6">
            <Button variant="link" type="button" className="text-sm">Forgot Password?</Button>
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
          <Button variant="link" type="button" onClick={onNavigateToSignUp}>
            SIGN UP
          </Button>
        </p>
      </div>
    </div>
  );
};