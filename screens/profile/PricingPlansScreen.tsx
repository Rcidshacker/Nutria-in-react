// --- START OF FILE screens/profile/PricingPlansScreen.tsx ---

import React from 'react'; // FIX: Removed unused 'useState'
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PRIMARY_COLOR_CLASS } from '../../constants';
import { Check } from 'lucide-react';

interface PricingPlansScreenProps {}

export const PricingPlansScreen: React.FC<PricingPlansScreenProps> = () => {
  // FIX: formData is now the single source of truth, no need for extra state.
  const { formData } = useSignUpForm();
  
  const mealType = formData.dietPreference === 'non-vegetarian' ? 'non-veg' : 'veg';

  // FIX: This function is no longer needed as there's no action to perform.
  // const handlePlanSelect = ...

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Our Pricing Plans</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Manage your subscription.
      </p>

      <div className="mb-8 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Your Preferences (Informational)</h3>
        <div className="space-y-2 text-sm">
            <p>Diet Type: <span className="font-semibold">{mealType.toUpperCase()}</span></p>
            <p>Primary Goal: <span className="font-semibold capitalize">{formData.fitnessGoal || 'Not Set'}</span></p>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id} 
            className={`
              p-6 border-2 rounded-xl w-full max-w-sm
              border-${PRIMARY_COLOR_CLASS}-500 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-${PRIMARY_COLOR_CLASS}-500 bg-${PRIMARY_COLOR_CLASS}-50 dark:bg-gray-700/30 shadow-xl
            `} 
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{plan.name}</h3>
              <p className={`text-3xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>{plan.price}</p>
              
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <Check className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS}-500 mr-2 flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button 
                variant={'primary'} 
                fullWidth 
                disabled={true}
                className="mt-auto"
            >
              Current Plan
            </Button>
          </div>
        ))}
      </div>
      
    </div>
  );
};


// --- END OF FILE screens/profile/PricingPlansScreen.tsx ---