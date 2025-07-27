
import { FitnessGoal, HealthConditionOption, Plan } from './types';

export const APP_NAME = "Nutria";
export const PRIMARY_COLOR_CLASS = "melon"; // New Primary: Melon Orange
export const ACCENT_COLOR_CLASS = "spicy-amber"; // New Accent: Spicy Amber

export const DIET_PREFERENCES = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian' },
];
// --- ADD THIS NEW CONSTANT ---
export const REGIONS = [
  { value: 'north', label: 'North' },
  { value: 'south', label: 'South' },
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
];
export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (light exercise/sports 1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (moderate exercise/sports 3-5 days/week)' },
  { value: 'active', label: 'Very active (hard exercise/sports 6-7 days a week)' },
  { value: 'extra-active', label: 'Extra active (very hard exercise/physical job)' },
];

export const FITNESS_GOALS: FitnessGoal[] = [
  { id: 'muscle-gain', emoji: '💪', title: 'Muscle Gain', description: 'Focus on building strength and lean mass.' },
  { id: 'fat-loss', emoji: '🔥', title: 'Fat Loss', description: 'Prioritize shedding body fat while preserving muscle.' },
  { id: 'maintenance', emoji: '🔄', title: 'Maintenance', description: 'Maintain your current physique and fitness level.' },
];

export const HEALTH_CONDITIONS: HealthConditionOption[] = [
  { 
    id: 'diabetic', 
    label: '🩸 Diabetic Care', 
    conditionalText: 'Diabetes Status:',
    conditionalOptions: [
      { value: 'controlled', label: 'Controlled' },
      { value: 'uncontrolled', label: 'Uncontrolled' },
    ]
  },
  { 
    id: 'pcod-pcos', 
    label: '♀ PCOD/PCOS',
    conditionalText: 'PCOD/PCOS Severity:',
    conditionalOptions: [
      { value: 'mild', label: 'Mild' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'severe', label: 'Severe' },
    ]
  },
  { id: 'thyroid', label: '🧠 Thyroid Support' }, // Label changed per instruction if "Healthy" is internal
];

export const PLANS: Plan[] = [
  {
    id: 'nutria',
    name: 'Nutria Plan',
    price: '₹499/month', // Example price
    features: ['Personalized meal plans', 'Full workout library', 'Dietitian support', 'Advanced tracking'],
  },
];

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'rupay', label: 'Rupay' },
];