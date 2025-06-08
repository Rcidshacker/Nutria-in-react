import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PRIMARY_COLOR_CLASS } from '../../constants';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
  </svg>
);

interface PricingPlansScreenProps {
    // navigateTo: (route: AppRoute) => void; // If navigation from here is needed
}

export const PricingPlansScreen: React.FC<PricingPlansScreenProps> = () => {
  const { formData, updateFormData } = useSignUpForm(); // Using to get current plan selection
  
  // Local state for preferences if they differ from sign-up or need temporary adjustment on this screen
  const [mealPreferences, setMealPreferences] = useState({ breakfast: true, lunch: true, dinner: true, snacks: false });
  const [mealType, setMealType] = useState<'veg' | 'non-veg' | ''>(formData.dietPreference === 'non-vegetarian' ? 'non-veg' : 'veg');
  const [dietType, setDietType] = useState<'balanced' | 'keto' | 'vegan' | ''>('balanced');


  const handlePlanSelect = (planId: 'free' | 'premium') => {
    updateFormData({ plan: planId });
    // Potentially navigate to payment or confirmation
    if (planId === 'premium' && formData.plan !== 'premium') {
        alert("Switched to Premium! (Payment flow not re-initiated here).");
    } else if (planId === 'free' && formData.plan === 'premium') {
        alert("Switched to Free plan.");
    }
  };
  
  const dietTypes = [
    { value: 'balanced', label: 'Balanced Diet' },
    { value: 'keto', label: 'Keto Diet' },
    { value: 'vegan', label: 'Vegan Diet' },
    { value: 'low-carb', label: 'Low Carb Diet' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Our Pricing Plans</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Manage your subscription or explore upgrade options.
      </p>

      {/* Placeholder for Preferences - These would typically influence plan recommendations or add-ons */}
      <div className="mb-8 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Your Preferences (Informational)</h3>
        <div className="space-y-2 text-sm">
            <p>Meal Types: <span className="font-semibold">{Object.entries(mealPreferences).filter(([_,v])=>v).map(([k])=>k.charAt(0).toUpperCase()+k.slice(1)).join(', ')}</span></p>
            <p>Diet Type: <span className="font-semibold">{mealType.toUpperCase()}</span></p>
            <p>Specific Diet Focus: <span className="font-semibold">{dietTypes.find(d=>d.value === dietType)?.label || 'N/A'}</span></p>
            <Button variant="link" size="sm" onClick={()=>alert("Preference adjustment coming soon!")}>Adjust Preferences</Button>
        </div>
      </div>


      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id} 
            className={`
              p-6 border-2 rounded-xl transition-all cursor-pointer flex flex-col justify-between
              ${formData.plan === plan.id 
                ? `border-${PRIMARY_COLOR_CLASS}-500 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-${PRIMARY_COLOR_CLASS}-500 bg-${PRIMARY_COLOR_CLASS}-50 dark:bg-gray-700/30 shadow-xl` 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800 shadow-md'}
            `} 
            onClick={() => handlePlanSelect(plan.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handlePlanSelect(plan.id)}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{plan.name}</h3>
              {plan.price ? (
                <p className={`text-3xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>{plan.price}</p>
              ) : (
                <p className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">Free</p>
              )}
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS}-500 mr-2 flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button 
                variant={formData.plan === plan.id ? 'primary': 'outline'} 
                fullWidth 
                disabled={formData.plan === plan.id}
                className="mt-auto"
            >
              {formData.plan === plan.id ? 'Current Plan' : `Switch to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>
      
      {formData.plan === 'premium' && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            To manage your premium subscription billing, please visit your account settings or contact support.
        </p>
      )}
    </div>
  );
};