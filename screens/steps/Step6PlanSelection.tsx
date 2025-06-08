
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PRIMARY_COLOR_CLASS } from '../../constants'; // melon
import { StepWrapper } from '../../components/StepWrapper';

interface Step6PlanSelectionProps {
  onNext: () => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
  </svg>
);


export const Step6PlanSelection: React.FC<Step6PlanSelectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [error, setError] = useState<string | undefined>();

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ plan: e.target.value as 'free' | 'premium' });
    if (error) setError(undefined);
  };

  const validate = () => {
    if (!formData.plan) {
      setError('Please select a plan to continue.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <StepWrapper title="Choose Your Plan">
      <p className="text-center text-cocoa-600 dark:text-clay-300 mb-6">
        Select the plan that best suits your journey with Nutria.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {PLANS.map(plan => (
          <div key={plan.id} className={`
            p-6 border rounded-lg transition-all cursor-pointer 
            ${formData.plan === plan.id 
              ? `border-${PRIMARY_COLOR_CLASS}-500 ring-2 ring-${PRIMARY_COLOR_CLASS}-400 bg-${PRIMARY_COLOR_CLASS}-50 dark:bg-cocoa-700` 
              : 'border-clay-300 dark:border-cocoa-600 hover:border-clay-400 dark:hover:border-cocoa-500 bg-white dark:bg-cocoa-800'}
          `} onClick={() => updateFormData({ plan: plan.id })}>
            <input
              type="radio"
              id={`plan-${plan.id}`}
              name="plan"
              value={plan.id}
              checked={formData.plan === plan.id}
              onChange={handlePlanChange}
              className="sr-only"
            />
            <h3 className="text-xl font-semibold text-cocoa-800 dark:text-peach-100 mb-2">{plan.name}</h3>
            {plan.price ? (
              <p className={`text-2xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>{plan.price}</p>
            ) : (
              <p className="text-2xl font-bold text-cocoa-700 dark:text-clay-300 mb-4">Free</p>
            )}
            <ul className="space-y-2 text-sm text-cocoa-600 dark:text-cocoa-400 mb-4">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start">
                  <CheckIcon className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS}-500 mr-2 flex-shrink-0`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
             {/* Sample Meals Preview */}
            <div className="mt-4 pt-4 border-t border-clay-200 dark:border-cocoa-600">
              <h4 className="text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-1">Sample Meals:</h4>
              <p className="text-xs text-cocoa-500 dark:text-cocoa-400">
                {plan.id === 'premium' ? 'E.g., Quinoa Salad, Grilled Chicken Bowl, Berry Smoothie' : 'E.g., Basic Calorie Log, Apple, Banana'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}
      <Button onClick={handleNext} fullWidth>
        {formData.plan === 'premium' ? 'Proceed to Payment' : 'Complete Signup'}
      </Button>
    </StepWrapper>
  );
};