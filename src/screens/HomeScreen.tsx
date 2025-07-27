// src/screens/HomeScreen.tsx

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
import { cn } from '../lib/utils';

interface HomeScreenProps {
  user: UserType;
  navigateTo: (route: AppRoute) => void;
  onSignOut?: () => void;
}

const todayMealsData = {
  breakfast: { icon: Coffee, items: ["Oatmeal with berries", "Boiled egg"], colorStripe: `bg-peach-300` },
  morningSnack: { icon: Apple, items: ["Apple slices", "Almonds"], colorStripe: `bg-coral-300` },
  lunch: { icon: UtensilsCrossed, items: ["Grilled chicken breast", "Quinoa salad", "Steamed broccoli"], colorStripe: `bg-melon-300` },
  eveningSnack: { icon: Apple, items: ["Yogurt"], colorStripe: `bg-spicy-amber-300` },
  dinner: { icon: Soup, items: ["Baked salmon", "Roasted vegetables"], colorStripe: `bg-clay-400` },
};

const dailyGoalsData = [
  { id: 'calories', icon: Flame, label: "Calories", current: 1500, target: 2200, unit: "kcal", themeColor: "red" },
  { id: 'steps', icon: Footprints, label: "Steps", current: 4000, target: 7000, unit: "steps", themeColor: "orange" },
  { id: 'water', icon: GlassWater, label: "Water", current: 6, target: 8, unit: "glasses", themeColor: "blue" },
  { id: 'sleep', icon: BedDouble, label: "Sleep", current: 6.5, target: 8, unit: "hrs", themeColor: "indigo" },
];

const healthTips = ["Stay hydrated! Aim for at least 8 glasses daily.", "A 15-minute walk after meals can aid digestion."];

const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Mapping object for dynamic Tailwind classes
const goalCardStyles: { [key: string]: { border: string; text: string; icon: string } } = {
  red: { border: 'border-red-500', text: 'text-red-600 dark:text-red-400', icon: 'text-red-500 dark:text-red-400' },
  orange: { border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400', icon: 'text-orange-500 dark:text-orange-400' },
  blue: { border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400', icon: 'text-blue-500 dark:text-blue-400' },
  indigo: { border: 'border-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', icon: 'text-indigo-500 dark:text-indigo-400' },
};

const GoalCard: React.FC<{
  icon: React.FC<{ className?: string }>;
  label: string;
  current: number | string;
  target: number | string;
  unit: string;
  themeColor: string;
}> = ({ icon: Icon, label, current, target, unit, themeColor }) => {
  const styles = goalCardStyles[themeColor] || goalCardStyles.red;
  return (
    <div className={cn("p-3 bg-white dark:bg-cocoa-800 rounded-2xl shadow-md border-t-4 flex flex-col justify-between transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1", styles.border)}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-cocoa-700 dark:text-clay-300 text-sm">{label}</h3>
        <Icon className={cn("w-5 h-5", styles.icon)} />
      </div>
      <div>
        <p className={cn("text-xl font-bold", styles.text)}>
          {current}
        </p>
        <p className="text-xs text-cocoa-500 dark:text-cocoa-400">/ {target} {unit}</p>
      </div>
    </div>
  );
};

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
    if (typeof bmi === 'string' || isNaN(Number(bmi))) return { label: "N/A", themeColor: "gray" };
    const numBmi = Number(bmi);
    if (numBmi < 18.5) return { label: "Underweight", themeColor: "blue" };
    if (numBmi < 24.9) return { label: "Normal", themeColor: "green" };
    if (numBmi < 29.9) return { label: "Overweight", themeColor: "orange" };
    return { label: "Obese", themeColor: "red" };
  };

  const bmiCategory = getBmiCategory(bmiValue);

  const bmiStyles: { [key: string]: { border: string; text: string; bg: string } } = {
    gray: { border: 'border-gray-500', text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-200' },
    blue: { border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-200' },
    green: { border: 'border-green-500', text: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-200' },
    orange: { border: 'border-orange-500', text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 text-orange-700 dark:bg-orange-800/30 dark:text-orange-200' },
    red: { border: 'border-red-500', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-200' },
  };
  const currentBmiStyles = bmiStyles[bmiCategory.themeColor];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-100 dark:from-cocoa-900 dark:to-cocoa-800 pb-20">
      <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
        <motion.section
          initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-cocoa-800 dark:text-peach-100">
            Hello, {user.name.split(' ')[0]}!
          </h1>
          <button
            onClick={() => navigateTo('#/app/profile')}
            aria-label="View Profile"
            className="transform transition-transform duration-150 hover:scale-105"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              alt="Profile Avatar"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-melon-500 dark:border-melon-400"
            />
          </button>
        </motion.section>

        <motion.section
          initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.4, delay: 0.2 }}
          className={cn('p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-lg border-l-4', currentBmiStyles.border)}
        >
          <h2 className="text-lg font-semibold text-cocoa-700 dark:text-clay-200 mb-1">Your BMI</h2>
          <div className="flex items-baseline space-x-2">
            <p className={cn('text-3xl font-bold', currentBmiStyles.text)}>{bmiValue}</p>
            <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', currentBmiStyles.bg)}>
              {bmiCategory.label}
            </span>
          </div>
          <p className="text-xs text-cocoa-500 dark:text-cocoa-400 mt-1">
            Based on height: {user.height}cm & weight: {user.weight}kg
          </p>
        </motion.section>

        <motion.section
          initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-cocoa-700 dark:text-clay-200 mb-3">Daily Goals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dailyGoalsData.map(goal => (
              <GoalCard key={goal.id} {...goal} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-cocoa-800 dark:text-peach-100 mb-3">Today's Meals</h2>
          <div className="space-y-4">
            {Object.entries(todayMealsData).map(([mealType, data]) => {
              const MealIcon = data.icon;
              const mealTitle = mealType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return (
                <div key={mealType} className="p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md flex">
                  <div className={cn("w-1.5 rounded-l-md mr-3", data.colorStripe)}></div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <MealIcon className="w-5 h-5 text-cocoa-500 dark:text-cocoa-400 mr-2" />
                      <h3 className="font-medium text-cocoa-700 dark:text-clay-300">{mealTitle}</h3>
                    </div>
                    <ul className="list-disc list-inside pl-1 space-y-0.5">
                      {data.items.map((item, index) => (
                        <li key={index} className="text-sm text-cocoa-600 dark:text-cocoa-400">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {currentTip && (
          <motion.section
            initial="hidden" animate="visible" variants={cardVariants} transition={{ duration: 0.4, delay: 0.5 }}
            className="p-4 bg-white dark:bg-cocoa-800 rounded-xl shadow-md border-t-4 border-spicy-amber-500"
          >
            <div className="flex items-start">
              <Lightbulb className="w-8 h-8 text-spicy-amber-500 dark:text-spicy-amber-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-md font-semibold text-cocoa-700 dark:text-clay-200 mb-1">Quick Tip</h3>
                <p className="text-sm text-cocoa-600 dark:text-cocoa-400">{currentTip}</p>
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};