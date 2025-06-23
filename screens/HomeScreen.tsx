// --- START OF FILE: screens/HomeScreen.tsx ---

import React, { useState, useEffect, useMemo } from 'react';
import { AppRoute, User as UserType } from '../types';
import { motion } from 'framer-motion';
import {
  Footprints,
  GlassWater,
  BedDouble,
  Coffee,
  Lightbulb,
  Apple,
  UtensilsCrossed,
  Soup,
  Flame,
} from 'lucide-react';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';

// FIX: Added the 'onSignOut' prop to the interface, which was missing.
interface HomeScreenProps {
  user: UserType;
  navigateTo: (route: AppRoute) => void;
  onSignOut: () => void;
}

const todayMealsData = {
    breakfast: { icon: Coffee, items: ["Oatmeal with berries", "Boiled egg"] },
    morningSnack: { icon: Apple, items: ["Apple slices", "Almonds"] },
    lunch: { icon: UtensilsCrossed, items: ["Grilled chicken breast", "Quinoa salad"] },
    eveningSnack: { icon: Apple, items: ["Yogurt"] },
    dinner: { icon: Soup, items: ["Baked salmon", "Roasted vegetables"] },
};
const dailyGoalsData = [
  { id: 'calories', icon: Flame, label: "Calories", current: 1500, target: 2200, unit: "kcal", themeColor: "red" },
  { id: 'steps', icon: Footprints, label: "Steps", current: 4000, target: 7000, unit: "steps", themeColor: ACCENT_COLOR_CLASS },
  { id: 'water', icon: GlassWater, label: "Water", current: 6, target: 8, unit: "glasses", themeColor: "blue" },
  { id: 'sleep', icon: BedDouble, label: "Sleep", current: 6.5, target: 8, unit: "hrs", themeColor: "indigo" },
];
const healthTips = ["Stay hydrated! Aim for at least 8 glasses daily.", "A 15-minute walk after meals can aid digestion."];
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }};
const BentoCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (<motion.div variants={cardVariants} className={`bg-white dark:bg-cocoa-800 rounded-2xl shadow-md p-4 flex flex-col ${className}`}>{children}</motion.div>);


export const HomeScreen: React.FC<HomeScreenProps> = ({ user, navigateTo }) => {
  const [currentTip, setCurrentTip] = useState<string>("");

  useEffect(() => {
    setCurrentTip(healthTips[Math.floor(Math.random() * healthTips.length)]);
  }, []);

  const bmiValue = useMemo(() => {
    if (user.height > 0 && user.weight > 0) {
      const heightInMeters = user.height / 100;
      return (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "N/A";
  }, [user.height, user.weight]);

  const getBmiCategory = (bmi: number | string) => {
    if (typeof bmi === 'string' || isNaN(Number(bmi))) return { label: "N/A", themeColor: "cocoa" };
    const numBmi = Number(bmi);
    if (numBmi < 18.5) return { label: "Underweight", themeColor: "blue" };
    if (numBmi < 24.9) return { label: "Normal", themeColor: "green" };
    if (numBmi < 29.9) return { label: "Overweight", themeColor: "orange" };
    return { label: "Obese", themeColor: "red" };
  };
  
  const bmiCategory = getBmiCategory(bmiValue);
  
  return (
    <div className="min-h-screen bg-peach-50 dark:bg-cocoa-900 pb-20">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-cocoa-800 dark:text-peach-100">
            Hello, {user.name.split(' ')[0]}!
          </h1>
          <button onClick={() => navigateTo('#/app/profile')} aria-label="View Profile" className="transform transition-transform duration-150 hover:scale-105">
            <img 
              src={`https://i.pravatar.cc/150?u=${user.email}`} 
              alt="Profile Avatar" 
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-${PRIMARY_COLOR_CLASS}-500 dark:border-${PRIMARY_COLOR_CLASS}-400`} 
            />
          </button>
        </motion.section>

        <motion.div 
            initial="hidden" animate="visible" transition={{ staggerChildren: 0.07 }}
            className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[10rem] gap-4"
        >
            <BentoCard className="col-span-2">
                <h2 className="text-lg font-semibold text-cocoa-700 dark:text-clay-200 mb-1">Your BMI</h2>
                <div className="flex items-baseline space-x-2">
                    <p className={`text-4xl font-bold text-${bmiCategory.themeColor}-600 dark:text-${bmiCategory.themeColor}-400`}>{bmiValue}</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full bg-${bmiCategory.themeColor}-100 text-${bmiCategory.themeColor}-800 dark:bg-${bmiCategory.themeColor}-800/30 dark:text-${bmiCategory.themeColor}-200`}>
                        {bmiCategory.label}
                    </span>
                </div>
                <p className="text-xs text-cocoa-500 dark:text-cocoa-400 mt-1">
                    Based on height: {user.height}cm & weight: {user.weight}kg
                </p>
            </BentoCard>

            <BentoCard className="col-span-2 lg:col-span-2 lg:row-span-2 !p-0 overflow-hidden">
                <h2 className="text-lg font-semibold text-cocoa-800 dark:text-peach-100 p-4 pb-2">Today's Meals</h2>
                <div className="space-y-3 overflow-y-auto px-4 pb-4 h-full scrollbar-thin scrollbar-thumb-clay-200 dark:scrollbar-thumb-cocoa-600">
                    {Object.entries(todayMealsData).map(([mealType, data]) => {
                        const MealIcon = data.icon;
                        const mealTitle = mealType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={mealType} className="flex items-start">
                                <MealIcon className="w-5 h-5 text-cocoa-500 dark:text-cocoa-400 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-cocoa-700 dark:text-clay-300 leading-tight">{mealTitle}</h3>
                                    <ul className="pl-1 space-y-0.5">
                                        {data.items.map((item, index) => (
                                            <li key={index} className="text-sm text-cocoa-600 dark:text-cocoa-400">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </BentoCard>
            
            {dailyGoalsData.slice(0, 2).map(goal => (
                <BentoCard key={goal.id}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-cocoa-700 dark:text-clay-300">{goal.label}</h3>
                        <goal.icon className={`w-6 h-6 text-${goal.themeColor}-500`} />
                    </div>
                    <p className={`text-2xl font-bold text-${goal.themeColor}-600 dark:text-${goal.themeColor}-400`}>{goal.current}</p>
                    <p className="text-sm text-cocoa-500 dark:text-cocoa-400">/ {goal.target} {goal.unit}</p>
                </BentoCard>
            ))}
            
            <BentoCard className="col-span-2">
                <div className="flex items-center mb-2">
                    <Lightbulb className={`w-6 h-6 text-${ACCENT_COLOR_CLASS}-500 mr-2`} />
                    <h3 className="text-lg font-semibold text-cocoa-700 dark:text-clay-200">Quick Tip</h3>
                </div>
                <p className="text-sm text-cocoa-600 dark:text-cocoa-400">{currentTip}</p>
            </BentoCard>

            {dailyGoalsData.slice(2, 4).map(goal => (
                <BentoCard key={goal.id}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-cocoa-700 dark:text-clay-300">{goal.label}</h3>
                        <goal.icon className={`w-6 h-6 text-${goal.themeColor}-500`} />
                    </div>
                    <p className={`text-2xl font-bold text-${goal.themeColor}-600 dark:text-${goal.themeColor}-400`}>{goal.current}</p>
                    <p className="text-sm text-cocoa-500 dark:text-cocoa-400">/ {goal.target} {goal.unit}</p>
                </BentoCard>
            ))}

        </motion.div>
      </div>
    </div>
  );
};

// --- END OF FILE: screens/HomeScreen.tsx ---