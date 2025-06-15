// --- START OF FILE screens/HomeScreen.tsx ---

import React, { useState, useEffect, useMemo } from 'react';
// UPDATED: Removed unused 'Button' component import
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants'; // UPDATED: Removed unused APP_NAME
import { AppRoute } from '../types';

// UPDATED: Removed unused 'User' icon and imported more specific icons for meals
import {
  Footprints,
  GlassWater,
  BedDouble,
  Coffee,
  Lightbulb,
  Apple,
  UtensilsCrossed,
  Soup,
} from 'lucide-react';

// UPDATED: Removed the unused 'onSignOut' prop from the interface
interface HomeScreenProps {
  navigateTo: (route: AppRoute) => void;
}

const userData = {
  name: "Alex",
  heightCm: 172,
  weightKg: 70,
};

const dailyRecommendationsData = [
  { id: 'steps', icon: Footprints, label: "Steps", current: 4000, target: 7000, unit: "steps", themeColor: ACCENT_COLOR_CLASS },
  { id: 'water', icon: GlassWater, label: "Water", current: 6, target: 8, unit: "glasses", themeColor: "coral" }, 
  { id: 'sleep', icon: BedDouble, label: "Sleep", current: 6.5, target: 8, unit: "hrs", themeColor: "peach" },
];

const todayMealsData = {
  breakfast: { icon: Coffee, items: ["Oatmeal with berries", "Boiled egg"], colorStripe: `bg-peach-300` },
  morningSnack: { icon: Apple, items: ["Apple slices", "Almonds"], colorStripe: `bg-coral-300` },
  lunch: { icon: UtensilsCrossed, items: ["Grilled chicken breast", "Quinoa salad", "Steamed broccoli"], colorStripe: `bg-melon-300` },
  eveningSnack: { icon: Apple, items: ["Yogurt"], colorStripe: `bg-spicy-amber-300` },
  dinner: { icon: Soup, items: ["Baked salmon", "Roasted vegetables"], colorStripe: `bg-clay-400` },
};

const dailyGoalProgress = 75;

const healthTips = [
  "Add more fiber to your diet to regulate blood sugar.",
  "Stay hydrated! Aim for at least 8 glasses daily.",
  "A 15-minute walk after meals can aid digestion.",
  "Prioritize 7-8 hours of sleep for optimal recovery.",
];

// UPDATED: Removed the unused 'onSignOut' prop from the function signature
export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo }) => {
  const [currentTip, setCurrentTip] = useState<string>("");

  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setCurrentTip(randomTip);
  }, []);

  const bmiValue = useMemo(() => {
    if (userData.heightCm > 0 && userData.weightKg > 0) {
      const heightInMeters = userData.heightCm / 100;
      return (userData.weightKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "N/A";
  }, [userData.heightCm, userData.weightKg]);

  const getBmiCategory = (bmi: number | string) => {
    if (typeof bmi === 'string' || isNaN(Number(bmi))) return { label: "N/A", themeColor: "cocoa" };
    const numBmi = Number(bmi);
    if (numBmi < 18.5) return { label: "Underweight", themeColor: "coral" };
    if (numBmi < 24.9) return { label: "Normal", themeColor: PRIMARY_COLOR_CLASS };
    if (numBmi < 29.9) return { label: "Overweight", themeColor: ACCENT_COLOR_CLASS };
    return { label: "Obese", themeColor: "spicy-amber" };
  };
  
  const bmiCategory = getBmiCategory(bmiValue);
  const bmiColorShade = bmiCategory.themeColor === ACCENT_COLOR_CLASS && bmiCategory.label === "Obese" ? '700' : '500';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-200 dark:from-cocoa-900 dark:to-cocoa-800 pb-20">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
        
        <section className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-cocoa-800 dark:text-peach-100">
            Hello, {userData.name}!
          </h1>
          <button 
            onClick={() => navigateTo('#/app/profile')} 
            aria-label="View Profile"
            className="transform transition-transform duration-150 hover:scale-105"
          >
            <img 
              src={`https://i.pravatar.cc/150?u=${userData.name}`} 
              alt="Profile Avatar" 
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-${PRIMARY_COLOR_CLASS}-500 dark:border-${PRIMARY_COLOR_CLASS}-400`} 
            />
          </button>
        </section>

        <section className={`p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-lg border-l-4 border-${bmiCategory.themeColor}-${bmiColorShade} transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]`}>
          <h2 className="text-lg font-semibold text-cocoa-700 dark:text-clay-200 mb-1">Your BMI</h2>
          <div className="flex items-baseline space-x-2">
            <p className={`text-3xl font-bold text-${bmiCategory.themeColor}-${bmiCategory.label === "Obese" ? '700' : '600'} dark:text-${bmiCategory.themeColor}-${bmiCategory.label === "Obese" ? '500' : '400'}`}>{bmiValue}</p>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${bmiCategory.themeColor}-100 text-${bmiCategory.themeColor}-700 dark:bg-${bmiCategory.themeColor}-700 dark:text-${bmiCategory.themeColor}-200`}>
              {bmiCategory.label}
            </span>
          </div>
          <p className="text-xs text-cocoa-500 dark:text-cocoa-400 mt-1">
            Based on your height: {userData.heightCm}cm and weight: {userData.weightKg}kg
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cocoa-700 dark:text-clay-200 mb-3">Daily Goals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dailyRecommendationsData.map(rec => {
              const RecommendationIcon = rec.icon;
              const progressPercent = rec.target > 0 ? (rec.current / rec.target) * 100 : 0;
              const recColorClass = rec.themeColor; 

              return (
                <div key={rec.id} className={`p-3 bg-white dark:bg-cocoa-800 rounded-xl shadow-md border-t-4 border-${recColorClass}-500 transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]`}>
                  <div className="flex items-center mb-2">
                    <RecommendationIcon className={`w-6 h-6 text-${recColorClass}-600 dark:text-${recColorClass}-400 mr-2`} />
                    <h3 className="font-medium text-cocoa-700 dark:text-clay-300">{rec.label}</h3>
                  </div>
                  <p className={`text-lg font-bold text-${recColorClass}-600 dark:text-${recColorClass}-400`}>
                    {rec.current} / {rec.target} <span className="text-xs">{rec.unit}</span>
                  </p>
                  <div className="w-full bg-clay-200 dark:bg-cocoa-700 rounded-full h-1.5 mt-1">
                    <div className={`bg-${recColorClass}-500 h-1.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cocoa-800 dark:text-peach-100 mb-3">Today's Meals</h2>
          <div className="space-y-4">
            {Object.entries(todayMealsData).map(([mealType, data]) => {
              const MealIcon = data.icon;
              const mealTitle = mealType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={mealType} className={`p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md flex transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]`}>
                  <div className={`w-1.5 rounded-l-md ${data.colorStripe} mr-3`}></div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                       <MealIcon className={`w-5 h-5 text-cocoa-500 dark:text-cocoa-400 mr-2`} />
                      <h3 className="font-medium text-cocoa-700 dark:text-clay-300">{mealTitle}</h3>
                    </div>
                    {data.items.length > 0 ? (
                      <ul className="list-disc list-inside pl-1 space-y-0.5">
                        {data.items.map((item, index) => (
                          <li key={index} className="text-sm text-cocoa-600 dark:text-cocoa-400">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-cocoa-500 dark:text-cocoa-400 italic">No meal data available for this slot.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md transform transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
          <h3 className="text-md font-medium text-cocoa-700 dark:text-clay-300 mb-1">
            Overall Daily Goal Progress
          </h3>
          <div className="w-full bg-clay-200 dark:bg-cocoa-700 rounded-full h-4 overflow-hidden">
            <div 
              className={`bg-gradient-to-r from-${PRIMARY_COLOR_CLASS}-500 to-${PRIMARY_COLOR_CLASS}-400 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all duration-500 ease-out`}
              style={{ width: `${dailyGoalProgress}%` }}
            >
             {dailyGoalProgress > 10 ? `${dailyGoalProgress}%` : ''} 
            </div>
          </div>
           {dailyGoalProgress < 10 && (
            <p className={`text-xs font-medium text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 text-center mt-1`}>{dailyGoalProgress}% achieved</p>
           )}
          <p className="text-sm text-cocoa-600 dark:text-cocoa-400 mt-1 text-center">
            You've achieved {dailyGoalProgress}% of your daily goal. Keep it up!
          </p>
        </section>

        {currentTip && (
          <section className={`p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md border-t-4 border-${ACCENT_COLOR_CLASS}-500 transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]`}>
            <div className="flex items-start">
              <Lightbulb className={`w-8 h-8 text-${ACCENT_COLOR_CLASS}-500 dark:text-${ACCENT_COLOR_CLASS}-400 mr-3 flex-shrink-0`} />
              <div>
                <h3 className="text-md font-semibold text-cocoa-700 dark:text-clay-200 mb-1">Quick Tip</h3>
                <p className="text-sm text-cocoa-600 dark:text-cocoa-400">{currentTip}</p>
              </div>
            </div>
          </section>
        )}
        
      </div>
    </div>
  );
};

// --- END OF FILE screens/HomeScreen.tsx ---