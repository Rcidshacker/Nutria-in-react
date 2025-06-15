// --- START OF FILE screens/steps/Step6PlanSelection.tsx ---

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PRIMARY_COLOR_CLASS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

// UPDATED: Import icon from lucide-react
import { Check } from 'lucide-react';

interface Step6PlanSelectionProps {
  onNext: () => void;
}

// DELETED: Manual CheckIcon component is removed.

export const Step6PlanSelection: React.FC<Step6PlanSelectionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [error, setError] = useState<string | undefined>();

  // In the new flow, there is only one plan, so we can hardcode it.
  const activePlan = PLANS.find(plan => plan.id === 'nutria'); 

  useEffect(() => {
    // Automatically select the 'nutria' plan if no plan is set.
    if (!formData.plan) {
      updateFormData({ plan: 'nutria' });
    }
  }, [formData.plan, updateFormData]);

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

  if (!activePlan) {
    return <div><StepWrapper title="Error">Plan not found</StepWrapper></div>;
  }

  return (
    <StepWrapper title="Your Nutria Plan">
      <p className="text-center text-cocoa-600 dark:text-clay-300 mb-6">
        Unlock your personalized health and nutrition journey with Nutria.
      </p>

      <div className="flex justify-center mb-8">
        <div className={`
          max-w-md w-full p-6 border rounded-lg transition-all
          border-${PRIMARY_COLOR_CLASS}-500 ring-2 ring-${PRIMARY_COLOR_CLASS}-400 bg-${PRIMARY_COLOR_CLASS}-50 dark:bg-cocoa-700
        `}>
          <input
            type="radio"
            name="plan"
            value="nutria"
            checked={true}
            readOnly
            className="sr-only"
          />

          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-cocoa-800 dark:text-peach-100 mb-2">{activePlan.name}</h3>
            <p className={`text-3xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>
              {activePlan.price}
            </p>
          </div>

          <ul className="space-y-3 text-sm text-cocoa-600 dark:text-cocoa-400 mb-6">
            {activePlan.features.map(feature => (
              <li key={feature} className="flex items-start">
                {/* UPDATED: Use lucide-react icon */}
                <Check className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS}-500 mr-3 flex-shrink-0 mt-0.5`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-clay-200 dark:border-cocoa-600">
            <h4 className="text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-2">Sample Meals:</h4>
            <p className="text-xs text-cocoa-500 dark:text-cocoa-400">
              Quinoa Salad, Grilled Chicken Bowl, Berry Smoothie, Avocado Toast, Protein Smoothie Bowl
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-clay-200 dark:border-cocoa-600">
            <div className={`bg-${PRIMARY_COLOR_CLASS}-100 dark:bg-cocoa-600 rounded-lg p-3`}>
              <p className="text-xs font-medium text-center text-cocoa-700 dark:text-clay-200">
                ✨ Get personalized meal plans tailored to your goals!
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}

      <Button onClick={handleNext} fullWidth>
        Proceed to Payment
      </Button>

      <p className="text-center text-xs text-cocoa-500 dark:text-cocoa-400 mt-4">
        Start your 7-day free trial • Cancel anytime
      </p>
    </StepWrapper>
  );
};


// --- END OF FILE screens/steps/Step6PlanSelection.tsx ---