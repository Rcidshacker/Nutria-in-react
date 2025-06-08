
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
import { MedicalReportUploadScreen } from './profile/MedicalReportUploadScreen'; // Verified: Correctly imported
import { Step6PlanSelection } from './steps/Step6PlanSelection'; 
import { Step7Payment } from './steps/Step7Payment'; 
import { PRIMARY_COLOR_CLASS } from '../constants'; // melon

interface SignUpScreenProps {
  onSignUpComplete: () => void;
  onNavigateToSignIn: () => void;
}

const BackArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUpComplete, onNavigateToSignIn }) => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>(1);
  const { formData, resetFormData } = useSignUpForm();
  const totalSteps = 8; // Verified: Correct total steps

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Check if current step is Plan Selection (new Step 7) and plan is 'free'
      if (currentStep === 7 && formData.plan === 'free') {
        handleCompleteSignup();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else if (currentStep === totalSteps) { // This means we are on the Payment step (new Step 8)
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
  
  const handleCompleteSignup = () => {
    console.log("Final Signup Data:", formData);
    alert("Signup Successful! (Data logged to console)");
    onSignUpComplete();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1Welcome onNext={nextStep} />;
      case 2: return <Step2BasicInfo onNext={nextStep} />;
      case 3: return <Step3HealthInfo onNext={nextStep} />;
      case 4: return <Step4FitnessGoal onNext={nextStep} />;
      case 5: return <Step5HealthCondition onNext={nextStep} />;
      case 6: return <MedicalReportUploadScreen onNext={nextStep} mode="onboarding" navigateTo={() => { /* No-op for onboarding */ }} />; // Verified: Step 6
      case 7: return <Step6PlanSelection onNext={nextStep} />; // Step 7
      case 8: return <Step7Payment onNext={nextStep} />; // Step 8
      default: return <div>Unknown Step</div>;
    }
  };
  
  const showSkipButton = currentStep >= 2 && currentStep <= 6; // Show skip for steps 2-6 (Basic Info to Medical Report)

  return (
    <div className="min-h-screen flex flex-col bg-peach-100 dark:bg-cocoa-900">
      <header className="sticky top-0 z-50 bg-white dark:bg-cocoa-800 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between max-w-3xl">
          <Button variant="ghost" onClick={prevStep} aria-label="Go back" className="w-10 h-10 flex items-center justify-center p-0">
            <BackArrowIcon className={`text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400 w-6 h-6`} />
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

       {currentStep > 1 && currentStep < totalSteps && !(currentStep === 7 && formData.plan === 'free') && ( // Hide footer on last step if it's payment or free plan completion
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