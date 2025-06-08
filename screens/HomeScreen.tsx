
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo'; // Keep for sign out section if needed, or remove if not used
import { APP_NAME, PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';
import { AppRoute } from '../types';
// import quotesData from '../quotes.json'; // Commented out

interface HomeScreenProps {
  onSignOut: () => void;
  navigateTo: (route: AppRoute) => void;
}

// --- Helper Icons (Simple SVGs) ---
const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
const FootstepsIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21H5.25a2.25 2.25 0 0 1-2.25-2.25V12M6.75 21V11.25a2.25 2.25 0 0 0-2.25-2.25H3.75M17.25 21V11.25a2.25 2.25 0 0 0-2.25-2.25H13.5M17.25 21h1.5a2.25 2.25 0 0 0 2.25-2.25V12m0 0a2.25 2.25 0 0 0-2.25-2.25H13.5m0 0V3.75A2.25 2.25 0 0 0 11.25 1.5h-2.5A2.25 2.25 0 0 0 6.5 3.75v5.25H3.75m0 0H2.25V12m0 0a2.25 2.25 0 0 0 2.25 2.25h1.5M13.5 9H12m1.5 0V6.75m0 2.25v2.25m0 0V12m0 0h-1.5m0 0H9.75M6.5 9H9m-2.5 0V6.75M6.5 9v2.25m0 0V12m0 0h2.5m0 0H12" /></svg>
);
const WaterGlassIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 2.25a.75.75 0 0 0-.75-.75H10.5a.75.75 0 0 0-.75.75v.75c0 .414.336.75.75.75h3c.414 0 .75-.336.75-.75v-.75Zm0 0A.75.75 0 0 1 15 3v15.75A2.25 2.25 0 0 1 12.75 21H11.25a2.25 2.25 0 0 1-2.25-2.25V3A.75.75 0 0 1 9.75 2.25M4.5 12.75a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.75a.75.75 0 0 0-.75.75v3Zm15 0a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.75a.75.75 0 0 0-.75.75v3Z" /></svg>
);
const SleepIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
);
const BreakfastIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( // Example
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.828 4.732a.5.5 0 0 1 .707-.707l3.536 3.535a.5.5 0 0 1-.707.707L9.828 4.732Zm7.07 7.071a.5.5 0 0 1-.707.707l-3.535-3.535a.5.5 0 0 1 .707-.707l3.535 3.535ZM4.5 19.5a2.25 2.25 0 0 0 2.25 2.25H18a2.25 2.25 0 0 0 2.25-2.25V9A2.25 2.25 0 0 0 18 6.75h-1.5M4.5 9.75V11.25M4.5 12.75V15M4.5 16.5V19.5M4.5 19.5h1.5m10.5 0h1.5m-13.5 0H18m-15-3.75h13.5m-13.5-3.75h13.5m-13.5-3.75H18M3 13.5h.008v.008H3v-.008Zm3.75 0h.008v.008H6.75v-.008Zm3.75 0h.008v.008h-.008v-.008Zm3.75 0h.008v.008h-.008v-.008Z" /></svg>
);
const LightbulbIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.055 15.055 0 0 1-4.5 0M12 3.75a2.25 2.25 0 0 0-2.25 2.25v1.5a2.25 2.25 0 0 0 4.5 0v-1.5A2.25 2.25 0 0 0 12 3.75Z" /></svg>
);

// --- Data Structures & Hardcoded Values ---
const userData = {
  name: "Alex", // Placeholder
  heightCm: 172,
  weightKg: 70,
};

const dailyRecommendationsData = [
  { id: 'steps', icon: FootstepsIcon, label: "Steps", current: 4000, target: 7000, unit: "steps", themeColor: ACCENT_COLOR_CLASS }, // spicy-amber
  { id: 'water', icon: WaterGlassIcon, label: "Water", current: 6, target: 8, unit: "glasses", themeColor: "coral" }, 
  { id: 'sleep', icon: SleepIcon, label: "Sleep", current: 6.5, target: 8, unit: "hrs", themeColor: "peach" },
];

const todayMealsData = {
  breakfast: { icon: BreakfastIcon, items: ["Oatmeal with berries", "Boiled egg"], colorStripe: "bg-peach-300" },
  morningSnack: { icon: BreakfastIcon, items: ["Apple slices", "Almonds"], colorStripe: "bg-coral-300" },
  lunch: { icon: BreakfastIcon, items: ["Grilled chicken breast", "Quinoa salad", "Steamed broccoli"], colorStripe: "bg-melon-300" },
  eveningSnack: { icon: BreakfastIcon, items: ["Yogurt"], colorStripe: "bg-spicy-amber-300" },
  dinner: { icon: BreakfastIcon, items: ["Baked salmon", "Roasted vegetables"], colorStripe: "bg-clay-400" },
};

const dailyGoalProgress = 75; // Percentage

const healthTips = [
  "Add more fiber to your diet to regulate blood sugar.",
  "Stay hydrated! Aim for at least 8 glasses daily.",
  "A 15-minute walk after meals can aid digestion.",
  "Prioritize 7-8 hours of sleep for optimal recovery.",
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSignOut, navigateTo }) => {
  // const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null); // Commented out
  const [currentTip, setCurrentTip] = useState<string>("");

  useEffect(() => {
    // Select a random quote
    // const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)]; // Commented out
    // setQuote(randomQuote); // Commented out
    // Select a random tip
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
    if (typeof bmi === 'string' || isNaN(Number(bmi))) return { label: "N/A", themeColor: "cocoa" }; // Using themeColor like others
    const numBmi = Number(bmi);
    if (numBmi < 18.5) return { label: "Underweight", themeColor: "coral" };
    if (numBmi < 24.9) return { label: "Normal", themeColor: PRIMARY_COLOR_CLASS }; // melon
    if (numBmi < 29.9) return { label: "Overweight", themeColor: ACCENT_COLOR_CLASS }; // spicy-amber
    return { label: "Obese", themeColor: "spicy-amber" }; // Using darker spicy-amber, or could introduce a new specific one
  };
  
  const bmiCategory = getBmiCategory(bmiValue);
  const bmiColorShade = bmiCategory.themeColor === ACCENT_COLOR_CLASS && bmiCategory.label === "Obese" ? '700' : '500'; // Darker for Obese if using same base

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-200 dark:from-cocoa-900 dark:to-cocoa-800 pb-20">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
        {/* A. Greeting & Profile */}
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

        {/* B. Inspirational Quote */}
        {/* {quote && ( // Commented out
          <section className="p-4 bg-white/50 dark:bg-cocoa-800/50 backdrop-blur-sm rounded-xl shadow-md transform transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            <p className="italic text-cocoa-700 dark:text-clay-300 text-center md:text-left">"{quote.quote}"</p>
            <p className="text-sm text-cocoa-500 dark:text-cocoa-400 text-right mt-1">- {quote.author}</p>
          </section>
        )} */}

        {/* C. BMI Summary */}
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

        {/* D. Daily Recommendations */}
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

        {/* E. Today’s Meals Overview */}
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

        {/* F. Daily Goal Progress */}
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

        {/* G. Health Tips & Insights */}
        {currentTip && (
          <section className={`p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md border-t-4 border-${ACCENT_COLOR_CLASS}-500 transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]`}>
            <div className="flex items-start">
              <LightbulbIcon className={`w-8 h-8 text-${ACCENT_COLOR_CLASS}-500 dark:text-${ACCENT_COLOR_CLASS}-400 mr-3 flex-shrink-0`} />
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