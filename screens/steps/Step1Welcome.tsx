
import React from 'react';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { APP_NAME, PRIMARY_COLOR_CLASS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

interface Step1WelcomeProps {
  onNext: () => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onNext }) => {
  return (
    <StepWrapper title={`Welcome to ${APP_NAME}`} className="text-center">
      <div className="flex justify-center mb-8">
        <Logo size="lg" />
      </div>
      <p className="text-cocoa-600 dark:text-clay-300 mb-8 text-lg">
        Embark on your journey to a healthier you! {APP_NAME} is your personalized guide to achieving your fitness and dietary goals.
      </p>
      <p className="text-sm text-cocoa-500 dark:text-cocoa-400 mb-10">
        We'll ask a few questions to tailor the perfect plan for you.
      </p>
      <Button onClick={onNext} fullWidth size="lg">
        Let's Get Started
      </Button>
    </StepWrapper>
  );
};