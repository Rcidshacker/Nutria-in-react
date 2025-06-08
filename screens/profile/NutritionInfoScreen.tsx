
import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PRIMARY_COLOR_CLASS, DIET_PREFERENCES, FITNESS_GOALS } from '../../constants';

export const NutritionInfoScreen: React.FC = () => {
  const { formData, updateFormData } = useSignUpForm();
  
  const [currentCalorieGoal, setCurrentCalorieGoal] = useState(formData.calorieGoal || '2000'); 
  const [showCalorieModal, setShowCalorieModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);
  
  const dietPlanOptions = [
    { value: 'balanced', label: 'Balanced Diet' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'high-protein', label: 'High Protein' },
    { value: 'keto', label: 'Ketogenic Diet (Premium Feature)' },
    { value: 'vegan', label: 'Vegan Meal Plan (Premium Feature)' }
  ];
  const [currentDietPlan, setCurrentDietPlan] = useState(formData.fitnessGoal === 'fat-loss' ? 'low-carb' : 'balanced');


  const handleAdjustCalories = () => {
    updateFormData({ calorieGoal: currentCalorieGoal });
    setShowCalorieModal(false);
    alert(`Calorie goal updated to ${currentCalorieGoal} kcal.`);
  };

  const handleChangeDietPlan = (newPlanValue: string) => {
     setCurrentDietPlan(newPlanValue); 
     setShowDietModal(false);
     alert(`Diet plan changed to: ${dietPlanOptions.find(d=>d.value === newPlanValue)?.label}.`);
  };

  const selectedPlanDetails = PLANS.find(p => p.id === formData.plan);
  const currentFitnessGoal = FITNESS_GOALS.find(g => g.id === formData.fitnessGoal);


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Your Nutrition Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-4 rounded-lg shadow border-l-4 border-${PRIMARY_COLOR_CLASS}-500 bg-gray-50 dark:bg-gray-700 transform transition-shadow duration-200 ease-in-out hover:shadow-md`}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Current Subscription Plan</h3>
          <p className={`text-xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`}>
            {selectedPlanDetails?.name || 'Free Plan'}
          </p>
          {selectedPlanDetails?.id === 'premium' && <p className="text-xs text-gray-500 dark:text-gray-400">Access to all premium features.</p>}
        </div>

        <div className={`p-4 rounded-lg shadow border-l-4 border-yellow-500 bg-gray-50 dark:bg-gray-700 transform transition-shadow duration-200 ease-in-out hover:shadow-md`}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Daily Calorie Goal</h3>
          <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{formData.calorieGoal || 'Not Set'} kcal</p>
          <Button variant="link" size="sm" onClick={() => setShowCalorieModal(true)} className="mt-1 p-0">Adjust Goal</Button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow transform transition-shadow duration-200 ease-in-out hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Dietary Focus</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-1">
          <span className="font-medium">Current Diet Type:</span> {dietPlanOptions.find(d => d.value === currentDietPlan)?.label || 'Balanced Diet'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-medium">Food Preference:</span> {DIET_PREFERENCES.find(dp => dp.value === formData.dietPreference)?.label || 'Not Set'}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
            <span className="font-medium">Primary Fitness Goal:</span> {currentFitnessGoal?.title || 'Not Set'}
        </p>
        <Button variant="outline" onClick={() => setShowDietModal(true)}>Change Diet Focus</Button>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-8">
        For detailed meal plans and recipes, please visit the "Meal Plans" section. This information helps us tailor recommendations.
      </p>

      {showCalorieModal && (
        <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/70 transition-opacity duration-300 ease-in-out ${showCalorieModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 ease-in-out ${showCalorieModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Adjust Daily Calorie Goal</h3>
            <Input
              label="New Calorie Goal (kcal)"
              type="number"
              value={currentCalorieGoal}
              onChange={(e) => setCurrentCalorieGoal(e.target.value)}
              placeholder="e.g., 2000"
              autoFocus
            />
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="ghost" onClick={() => setShowCalorieModal(false)}>Cancel</Button>
              <Button onClick={handleAdjustCalories}>Save Goal</Button>
            </div>
          </div>
        </div>
      )}

      {showDietModal && (
         <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/70 transition-opacity duration-300 ease-in-out ${showDietModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 ease-in-out ${showDietModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Change Diet Focus</h3>
            <Select
                label="Select New Diet Plan"
                options={dietPlanOptions}
                value={currentDietPlan}
                onChange={(e) => handleChangeDietPlan(e.target.value)}
                autoFocus
            />
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 mb-4">Note: Some diet plans might be part of Premium subscription features.</p>
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="ghost" onClick={() => setShowDietModal(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
