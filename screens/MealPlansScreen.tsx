// --- START OF FILE screens/MealPlansScreen.tsx ---

// FIX: Removed unused 'useEffect' from the import
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '../components/Button';
import { AppRoute, MealNutrition, MealOption, MealSlot, DailyMealPlan } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants';

import {
  Flame,
  Beef,
  Wheat,
  Droplet,
  Leaf,
  Coffee,
  Utensils,
  Soup,
  Apple,
  Loader,
} from 'lucide-react';

const mealSlotIcons: Record<MealSlot['type'], React.FC<{ className?: string }>> = {
  breakfast: Coffee,
  morningSnack: Apple,
  lunch: Utensils,
  eveningSnack: Apple,
  dinner: Soup,
};

const mockMealOptions: MealOption[] = [
  { id: 'oatmeal-berries', name: 'Oatmeal with Berries', imageUrl: 'https://picsum.photos/seed/oatmeal-berries/300/200', nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 7 }, recipeId: 'oatmeal-berries', tags: ['High Fiber'] },
  { id: 'scrambled-eggs', name: 'Scrambled Eggs & Toast', imageUrl: 'https://picsum.photos/seed/scrambled-eggs/300/200', nutrition: { calories: 400, protein: 20, carbs: 30, fat: 20, fiber: 3 }, recipeId: 'scrambled-eggs', tags: ['High Protein'] },
  { id: 'chicken-salad', name: 'Grilled Chicken Salad', imageUrl: 'https://picsum.photos/seed/chickensalad/300/200', nutrition: { calories: 450, protein: 40, carbs: 20, fat: 25, fiber: 8 }, recipeId: 'chicken-salad', tags: ['Low Carb'] },
  { id: 'apple-pb', name: 'Apple with Peanut Butter', imageUrl: 'https://picsum.photos/seed/apple-pb/300/200', nutrition: { calories: 200, protein: 5, carbs: 25, fat: 10, fiber: 5 }, recipeId: 'apple-pb' },
  { id: 'quinoa-bowl', name: 'Quinoa Bowl with Veggies', imageUrl: 'https://picsum.photos/seed/quinoa-bowl/300/200', nutrition: { calories: 500, protein: 15, carbs: 70, fat: 18, fiber: 12 }, recipeId: 'quinoa-bowl', tags: ['Vegan'] },
  { id: 'greek-yogurt', name: 'Greek Yogurt with Honey', imageUrl: 'https://picsum.photos/seed/greek-yogurt/300/200', nutrition: { calories: 180, protein: 15, carbs: 20, fat: 5, fiber: 1 }, recipeId: 'greek-yogurt' },
  { id: 'salmon-asparagus', name: 'Baked Salmon & Asparagus', imageUrl: 'https://picsum.photos/seed/salmon-asparagus/300/200', nutrition: { calories: 550, protein: 45, carbs: 30, fat: 28, fiber: 6 }, recipeId: 'salmon-asparagus' },
];

const getNormalizedDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(12, 0, 0, 0);
  return newDate;
}

const createDailyMealPlan = (date: Date): DailyMealPlan => {
  const normalizedDate = getNormalizedDate(date);
  const dateString = normalizedDate.toISOString().split('T')[0];
  const dayLabel = normalizedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return {
    date: dateString,
    dayLabel: dayLabel,
    mealSlots: [
      { type: 'breakfast', colorStripe: 'bg-peach-300', options: [mockMealOptions[0], mockMealOptions[1]], selectedOptionId: mockMealOptions[0].id },
      { type: 'morningSnack', colorStripe: 'bg-coral-300', options: [mockMealOptions[3]], selectedOptionId: mockMealOptions[3].id  },
      { type: 'lunch', colorStripe: 'bg-melon-300', options: [mockMealOptions[2], mockMealOptions[4]], selectedOptionId: mockMealOptions[2].id },
      { type: 'eveningSnack', colorStripe: 'bg-spicy-amber-300', options: [mockMealOptions[5]], selectedOptionId: mockMealOptions[5].id  },
      { type: 'dinner', colorStripe: 'bg-clay-400', options: [mockMealOptions[6]], selectedOptionId: mockMealOptions[6].id },
    ]
  };
};

const generateInitialPlans = () => {
  const plans: { [date: string]: DailyMealPlan } = {};
  const today = getNormalizedDate(new Date());
  const startOfWeek = getNormalizedDate(new Date());
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = -7; i < 14; i++) {
    const date = getNormalizedDate(new Date(startOfWeek));
    date.setDate(startOfWeek.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    plans[dateString] = createDailyMealPlan(date);
  }
  return plans;
};

const calculateDayTotals = (dayPlan: DailyMealPlan | undefined): MealNutrition => {
  const totals: MealNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  if (!dayPlan) return totals;
  dayPlan.mealSlots.forEach(slot => {
    if (slot.selectedOptionId) {
      const selectedOption = slot.options.find(opt => opt.id === slot.selectedOptionId);
      if (selectedOption) {
        totals.calories += selectedOption.nutrition.calories;
        totals.protein += selectedOption.nutrition.protein;
        totals.carbs += selectedOption.nutrition.carbs;
        totals.fat += selectedOption.nutrition.fat;
        totals.fiber = (totals.fiber || 0) + (selectedOption.nutrition.fiber || 0);
      }
    }
  });
  return totals;
};

const DaySummaryCard: React.FC<{ dayPlan: DailyMealPlan; isSelected: boolean; onSelect: () => void; }> = ({ dayPlan, isSelected, onSelect }) => {
    const totals = useMemo(() => calculateDayTotals(dayPlan), [dayPlan]);
    const dateObj = getNormalizedDate(new Date(dayPlan.date));
    const dayAbbr = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dateNum = dateObj.getDate();
    const selectedClasses = `bg-${PRIMARY_COLOR_CLASS}-500 text-white shadow-lg`;
    const defaultClasses = `bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300`;
    return (
        <button
            onClick={onSelect}
            className={`flex-shrink-0 w-20 p-3 rounded-lg text-center cursor-pointer transition-all duration-200 transform hover:scale-105 ${isSelected ? selectedClasses : defaultClasses}`}
            aria-label={`Select day ${dayPlan.dayLabel}`}
        >
            <div className="font-bold text-sm">{dayAbbr}</div>
            <div className={`text-xl font-bold ${isSelected ? '' : `text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`}`}>{dateNum}</div>
            <div className="text-xs mt-1">{totals.calories} kcal</div>
        </button>
    );
};

const WeeklyPlanView: React.FC<{
    currentDate: Date;
    dailyPlans: { [key: string]: DailyMealPlan };
    onDateSelect: (date: Date) => void;
    onWeekChange: (weeks: number) => void;
}> = ({ currentDate, dailyPlans, onDateSelect, onWeekChange }) => {
    const weekPlans = useMemo(() => {
        const startOfWeek = getNormalizedDate(new Date(currentDate));
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const week: DailyMealPlan[] = [];
        for (let i = 0; i < 7; i++) {
            const date = getNormalizedDate(new Date(startOfWeek));
            date.setDate(startOfWeek.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            if (dailyPlans[dateString]) {
                week.push(dailyPlans[dateString]);
            }
        }
        return week;
    }, [currentDate, dailyPlans]);

    if (weekPlans.length < 7) return null; 

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
             <div className="flex justify-between items-center mb-3">
                <Button variant="ghost" size="sm" onClick={() => onWeekChange(-1)} aria-label="Previous week">←</Button>
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => onWeekChange(1)} aria-label="Next week">→</Button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {weekPlans.map(plan => (
                    <DaySummaryCard
                        key={plan.date}
                        dayPlan={plan}
                        isSelected={plan.date === currentDate.toISOString().split('T')[0]}
                        onSelect={() => onDateSelect(getNormalizedDate(new Date(plan.date)))}
                    />
                ))}
            </div>
        </div>
    );
};

interface MealPlansScreenProps {
  navigateTo: (route: AppRoute) => void;
}

const NutrientDisplay: React.FC<{ icon: React.FC<{className?: string}>, value?: number, unit: string, label: string, colorClass: string }> = ({ icon: Icon, value, unit, label, colorClass }) => (
  <div className="flex items-center space-x-1">
    <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
    <span className={`text-xs ${colorClass}`}>{value || 0}{unit}</span>
    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">{label}</span>
  </div>
);

const MealOptionCard: React.FC<{ option: MealOption; onSelect: () => void; onViewRecipe: () => void; isSelected: boolean }> = ({ option, onSelect, onViewRecipe, isSelected }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02] ${isSelected ? `ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-${PRIMARY_COLOR_CLASS}-500` : 'ring-1 ring-gray-200 dark:ring-gray-700'}`}>
      <img src={option.imageUrl || `https://picsum.photos/seed/${option.id}/300/200`} alt={option.name} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate mb-1" title={option.name}>{option.name}</h4>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
            <NutrientDisplay icon={Flame} value={option.nutrition.calories} unit="kcal" label="Cal" colorClass="text-red-500 dark:text-red-400" />
            <NutrientDisplay icon={Beef} value={option.nutrition.protein} unit="g" label="Pro" colorClass="text-blue-500 dark:text-blue-400" />
            <NutrientDisplay icon={Wheat} value={option.nutrition.carbs} unit="g" label="Carb" colorClass="text-yellow-600 dark:text-yellow-500" />
            <NutrientDisplay icon={Droplet} value={option.nutrition.fat} unit="g" label="Fat" colorClass="text-purple-500 dark:text-purple-400" />
            {option.nutrition.fiber && (
              <NutrientDisplay icon={Leaf} value={option.nutrition.fiber} unit="g" label="Fiber" colorClass="text-green-500 dark:text-green-400" />
            )}
        </div>
        <div className="flex space-x-2 mt-2">
          <Button onClick={onViewRecipe} variant="link" size="sm" className="text-xs p-0">View Recipe</Button>
          <Button onClick={onSelect} variant={isSelected ? "primary" : "outline"} size="sm" className="text-xs flex-grow">
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const LoadingComponent = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-full">
    <Loader className={`w-12 h-12 text-${PRIMARY_COLOR_CLASS}-500 animate-spin mb-4`} />
    <p className="text-lg font-medium text-cocoa-600 dark:text-clay-300">Loading Your Meal Plan...</p>
    <p className="text-sm text-cocoa-500 dark:text-cocoa-400">Please wait a moment.</p>
  </div>
);

export const MealPlansScreen: React.FC<MealPlansScreenProps> = ({ navigateTo }) => {
  const [currentDate, setCurrentDate] = useState(getNormalizedDate(new Date()));
  const [dailyPlans, setDailyPlans] = useState<{ [date: string]: DailyMealPlan }>(generateInitialPlans());

  const currentDayPlan = useMemo(() => {
    const dateString = currentDate.toISOString().split('T')[0];
    return dailyPlans[dateString]; 
  }, [currentDate, dailyPlans]);

  const handleWeekChange = (weeksToAdd: number) => {
    setCurrentDate(prevDate => {
      const newDate = getNormalizedDate(new Date(prevDate));
      newDate.setDate(prevDate.getDate() + (weeksToAdd * 7));
      return newDate;
    });
  };

  const handleSelectMeal = useCallback((mealSlotType: MealSlot['type'], optionId: string) => {
    const dateString = currentDate.toISOString().split('T')[0];
    setDailyPlans(prevPlans => {
      const currentPlan = prevPlans[dateString];
      if (!currentPlan) return prevPlans;
      
      const updatedDayPlan = { ...currentPlan };
      updatedDayPlan.mealSlots = updatedDayPlan.mealSlots.map(slot =>
        slot.type === mealSlotType ? { ...slot, selectedOptionId: optionId } : slot
      );
      return { ...prevPlans, [dateString]: updatedDayPlan };
    });
  }, [currentDate]);

  const handleViewRecipe = (recipeId?: string) => {
    if (recipeId) {
      navigateTo(`#/app/recipe?id=${recipeId}`);
    } else {
      alert("Recipe details not available for this meal.");
    }
  };
  
  if (!currentDayPlan) {
    return <LoadingComponent />;
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto pb-20 space-y-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">Your Meal Plan</h1>

      <WeeklyPlanView 
        currentDate={currentDate}
        dailyPlans={dailyPlans}
        onDateSelect={setCurrentDate}
        onWeekChange={handleWeekChange}
      />

      <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
          {currentDayPlan.dayLabel}
      </h2>

      {currentDayPlan.mealSlots.map(slot => {
        const SlotIcon = mealSlotIcons[slot.type];
        const mealTitle = slot.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        return (
          <section key={slot.type} className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className={`flex items-center mb-3 p-3 rounded-t-lg ${slot.colorStripe || 'bg-gray-200 dark:bg-gray-700'}`}>
                <SlotIcon className="w-5 h-5 mr-3 text-gray-700 dark:text-gray-200" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{mealTitle}</h3>
            </div>
            <div className="p-4 pt-1">
              {slot.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slot.options.map(option => (
                    <MealOptionCard
                      key={option.id}
                      option={option}
                      onSelect={() => handleSelectMeal(slot.type, option.id)}
                      onViewRecipe={() => handleViewRecipe(option.recipeId)}
                      isSelected={slot.selectedOptionId === option.id}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic px-2">No meal options available for this slot.</p>
              )}
            </div>
          </section>
        );
      })}
      
      <div className="mt-8 text-center">
        <Button variant="primary" onClick={() => alert("Customize Meal Plan feature coming soon!")}>
            Customize My Meal Plan
        </Button>
      </div>
    </div>
  );
};


// --- END OF FILE screens/MealPlansScreen.tsx ---