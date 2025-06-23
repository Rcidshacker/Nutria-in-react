// --- START OF FILE: screens/SignUpScreen.tsx ---

import React, { useState } from 'react';
import { useSignUpForm } from '../contexts/SignUpContext';
import { SignUpStep } from '../types';
import { ProgressDots } from '../components/ProgressDots';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Step1Welcome } from './steps/Step1Welcome';
import { Step2BasicInfo } from './steps/Step2BasicInfo';
import { Step3HealthInfo } from './steps/Step3HealthInfo';
import { Step4FitnessGoal } from './steps/Step4FitnessGoal';
import { Step5HealthCondition } from './steps/Step5HealthCondition';
import { MedicalReportUploadScreen } from './profile/MedicalReportUploadScreen';
import { Step6PlanSelection } from './steps/Step6PlanSelection'; 
import { Step7Payment } from './steps/Step7Payment'; 
import { PRIMARY_COLOR_CLASS } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { authService } from '../services/api';

interface SignUpScreenProps {
  onSignUpComplete: () => void;
  onNavigateToSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUpComplete, onNavigateToSignIn }) => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>(1);
  const { formData, resetFormData } = useSignUpForm();
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 8; 

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleCompleteSignup();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      resetFormData();
      onNavigateToSignIn();
    }
  };
  
  const handleCompleteSignup = async () => {
    setIsLoading(true);
    try {
      const signUpResult = await authService.signUp(formData);
      console.log("✅ Signup successful:", signUpResult);
      await authService.signIn(formData.email, formData.password);
      alert("Signup Successful! Welcome to Nutria!");
      onSignUpComplete();
    } catch (error) {
      alert("Signup failed. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1Welcome onNext={nextStep} />;
      case 2: return <Step2BasicInfo onNext={nextStep} />;
      case 3: return <Step3HealthInfo onNext={nextStep} />;
      case 4: return <Step4FitnessGoal onNext={nextStep} />;
      case 5: return <Step5HealthCondition onNext={nextStep} />;
      case 6: return <MedicalReportUploadScreen onNext={nextStep} mode="onboarding" navigateTo={() => {}} />;
      case 7: return <Step6PlanSelection onNext={nextStep} />;
      // UPDATED: Pass the isLoading state down as a prop
      case 8: return <Step7Payment onNext={handleCompleteSignup} isLoading={isLoading} />;
      default: return <div>Unknown Step</div>;
    }
  };
  
  const showSkipButton = currentStep >= 2 && currentStep <= 6;

  return (
    <div className="min-h-screen flex flex-col bg-peach-100 dark:bg-cocoa-900">
      <header className="sticky top-0 z-50 bg-white dark:bg-cocoa-800 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <Button variant="ghost" onClick={prevStep} aria-label="Go back" className="w-10 h-10 flex items-center justify-center p-0">
            <ArrowLeft className={`text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400 w-6 h-6`} />
          </Button>
          <Logo size="sm" />
          <ProgressDots totalSteps={totalSteps} currentStep={currentStep} />
          <div className="w-10 h-10 flex items-center justify-center">
           { showSkipButton && (
             <Button variant="link" size="sm" onClick={nextStep} className="text-sm p-0">
                Skip
              </Button>
           ) }
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-3xl overflow-y-auto">
          {renderStepContent()}
        </div>
      </main>
      {currentStep > 1 && currentStep < totalSteps && (
        <footer className="sticky bottom-0 bg-white dark:bg-cocoa-800 p-4 border-t border-clay-200 dark:border-cocoa-700">
          <div className="container mx-auto flex justify-start items-center max-w-3xl">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};