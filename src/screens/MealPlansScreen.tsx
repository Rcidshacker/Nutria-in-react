// src/screens/MealPlansScreen.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { ApiDietPlan, ApiMeal } from '../types';
import { dietPlanService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Utensils, Wheat, Flame, Beef, Leaf } from 'lucide-react';

const MealCard: React.FC<{ meal: ApiMeal }> = ({ meal }) => (
  <div className="bg-white dark:bg-cocoa-800 rounded-lg shadow-md p-4 space-y-2 transform transition-all hover:shadow-lg hover:scale-[1.01]">
    <h4 className="font-bold text-lg text-cocoa-800 dark:text-peach-100">{meal.name}</h4>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center"><Flame className="w-4 h-4 mr-2 text-red-500" /> {meal.calories.toFixed(0)} kcal</div>
      <div className="flex items-center"><Beef className="w-4 h-4 mr-2 text-blue-500" /> {meal.proteins.toFixed(1)}g P</div>
      <div className="flex items-center"><Wheat className="w-4 h-4 mr-2 text-yellow-500" /> {meal.carbs.toFixed(1)}g C</div>
      <div className="flex items-center"><Leaf className="w-4 h-4 mr-2 text-green-500" /> {meal.fats?.toFixed(1) ?? 'N/A'}g F</div>
    </div>
  </div>
);

const DayPlan: React.FC<{ day: string; plan: ApiMeal[] }> = ({ day, plan }) => {
  const groupedMeals = plan.reduce((acc, meal) => {
    const type = meal.meal_type || 'Uncategorized';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, ApiMeal[]>);

  const mealOrder = ['Breakfast', 'Morning_Snacks', 'Lunch', 'Dinner'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-center text-cocoa-800 dark:text-peach-100 sticky top-0 bg-peach-50 dark:bg-cocoa-900 py-2 z-10">
        {day}
      </h3>
      {mealOrder.map((mealType) => {
        const meals = groupedMeals[mealType] || [];
        const mealTypeName = mealType.replace(/_/g, ' ');

        return (
          <div key={mealType}>
            <h4 className="font-semibold text-lg text-melon-700 dark:text-melon-400 mb-2">{mealTypeName}</h4>
            
            {meals.length > 0 ? (
              <div className="space-y-3">
                {meals.map((meal: ApiMeal, index: number) => (
                  <MealCard key={`${mealType}-${index}`} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-cocoa-900/50 rounded-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700">
                <p>No meals scheduled for {mealTypeName}.</p>
              </div>
            )}
          </div>
        )
      })}
    </motion.div>
  );
};

export const MealPlansScreen: React.FC = () => {
  const [dietPlan, setDietPlan] = useState<ApiDietPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchPlan = async () => {
    setIsLoading(true);
    try {
      const planData = await dietPlanService.getMyPlan();
      // FIX: The service already returns the data object. No need for .data again.
      setDietPlan(planData);
    } catch (error) {
      console.error("Failed to fetch diet plan:", error);
      setDietPlan(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const newPlanData = await dietPlanService.generatePlan();
      // FIX: The service already returns the data object. No need for .data again.
      setDietPlan(newPlanData);
    } catch (error) {
      console.error("Failed to generate diet plan:", error);
      alert("We encountered an issue while generating your plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-[calc(100vh-10rem)]">
        <Loader className="w-12 h-12 text-melon-500 animate-spin mb-4" />
        <p className="text-lg font-medium text-cocoa-600 dark:text-clay-300">Loading Your Meal Plan...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-md mx-auto pb-20 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">Your Meal Plan</h1>
      
      <AnimatePresence mode="wait">
        {dietPlan && dietPlan.meal_plan && Object.keys(dietPlan.meal_plan).length > 0 ? (
          <motion.div key="plan-display" className="space-y-8">
            {Object.entries(dietPlan.meal_plan).map(([day, dailyPlan]) => (
              <DayPlan key={day} day={day} plan={dailyPlan as ApiMeal[]} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-plan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-cocoa-800 rounded-2xl shadow-lg"
          >
            <Utensils className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Ready for Your Personalized Plan?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm">
              It looks like you don't have a diet plan yet. Let's create one based on your profile to get you started on your health journey!
            </p>
            <Button onClick={handleGeneratePlan} isLoading={isGenerating} size="lg">
              {isGenerating ? 'Generating Your Plan...' : 'Generate My First Plan'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};