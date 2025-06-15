// --- START OF FILE screens/profile/BMICalculatorScreen.tsx ---

import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PRIMARY_COLOR_CLASS } from '../../constants';
import { Calculator } from 'lucide-react'; // UPDATED: Import icon

// DELETED: Manual BMICalculatorIcon component is no longer needed.

export const BMICalculatorScreen: React.FC = () => {
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  const [bmiResult, setBmiResult] = useState<{ value: string; category: string; color: string } | null>(null);

  const calculateBmi = () => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmiResult({ value: 'N/A', category: 'Invalid input', color: 'gray' });
      return;
    }

    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters));
    const bmiFixed = bmi.toFixed(1);
    
    let category = '';
    let color = PRIMARY_COLOR_CLASS;

    if (bmi < 18.5) { category = 'Underweight'; color = 'blue'; }
    else if (bmi < 24.9) { category = 'Normal weight'; color = PRIMARY_COLOR_CLASS; }
    else if (bmi < 29.9) { category = 'Overweight'; color = 'orange'; }
    else { category = 'Obese'; color = 'red'; }

    setBmiResult({ value: bmiFixed, category, color });
  };
  
  const colorClasses: Record<string, { text: string, bg: string, border: string }> = {
      [PRIMARY_COLOR_CLASS]: { text: `text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`, bg: `bg-${PRIMARY_COLOR_CLASS}-100 dark:bg-${PRIMARY_COLOR_CLASS}-900/50`, border: `border-${PRIMARY_COLOR_CLASS}-500` },
      blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/50', border: 'border-blue-500' },
      orange: { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/50', border: 'border-orange-500' },
      red: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/50', border: 'border-red-500' },
      gray: { text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-700', border: 'border-gray-500' },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
        <Calculator className={`w-6 h-6 mr-3 text-${PRIMARY_COLOR_CLASS}-500`} />
        BMI Calculator
      </h2>
      
      <div className="space-y-4 mb-6">
        <Input
          label="Your Height (cm)"
          id="heightCm"
          name="heightCm"
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          placeholder="e.g. 170"
          min="1"
        />
        <Input
          label="Your Weight (kg)"
          id="weightKg"
          name="weightKg"
          type="number"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          placeholder="e.g. 65"
          min="1"
        />
      </div>

      <Button onClick={calculateBmi} fullWidth>
        Calculate BMI
      </Button>

      {bmiResult && (
        <div className={`mt-8 p-6 rounded-lg shadow-lg border-l-4 ${colorClasses[bmiResult.color]?.border || 'border-gray-500'} ${colorClasses[bmiResult.color]?.bg || 'bg-gray-100'}`}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Your BMI Result:</h3>
          <p className={`text-4xl font-bold ${colorClasses[bmiResult.color]?.text || 'text-gray-800'}`}>
            {bmiResult.value}
          </p>
          <p className={`mt-1 text-md font-medium ${colorClasses[bmiResult.color]?.text || 'text-gray-600'}`}>
            Category: {bmiResult.category}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Note: BMI is a general indicator and may not be accurate for all body types (e.g., athletes). Consult a healthcare professional for personalized advice.
          </p>
        </div>
      )}
    </div>
  );
};


// --- END OF FILE screens/profile/BMICalculatorScreen.tsx ---