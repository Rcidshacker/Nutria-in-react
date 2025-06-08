
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '../components/Button';
import { AppRoute, MealNutrition, MealOption, MealSlot, DailyMealPlan } from '../types';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';

// --- Icons (ensure these are in index.html or defined as full SVGs here) ---
// Using the <use href> pattern for icons defined in index.html
const FireIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><use href="#icon-fire"></use></svg>
);
const ProteinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><use href="#icon-protein"></use></svg>
);
const CarbsIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><use href="#icon-carbs"></use></svg>
);
const FatIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><use href="#icon-fat"></use></svg>
);
const FiberIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><use href="#icon-fiber"></use></svg>
);

// Custom Meal Slot Icons (Simple SVGs)
const BreakfastIconSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( // Coffee mug
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a2.25 2.25 0 0 1-2.25 2.25H7.5a2.25 2.25 0 0 1-2.25-2.25V4.5A2.25 2.25 0 0 1 7.5 2.25h.75m4.5.75A2.25 2.25 0 0 0 10.5 6M5.25 19.5c1.364-1.458 3.203-2.25 5.25-2.25s3.886.792 5.25 2.25M18.75 13.5A4.5 4.5 0 1 1 15 13.5h3.75Z" />
  </svg>
);
const LunchIconSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( // Plate with cutlery
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 10.5V7.5a2.25 2.25 0 0 0-2.25-2.25h-15a2.25 2.25 0 0 0-2.25 2.25v3m19.5 0V16.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V10.5m19.5 0a2.25 2.25 0 0 0-2.25-2.25h-4.5a2.25 2.25 0 0 0-2.25 2.25m4.5 0V19.5M5.25 10.5a2.25 2.25 0 0 1 2.25-2.25h4.5a2.25 2.25 0 0 1 2.25 2.25m-9 0V19.5m0-9H3m2.25 0h13.5" />
  </svg>
);
const DinnerIconSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( // Moon and plate (simplified)
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-2.25z" />
  </svg>
);
const SnackIconSVG: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( // Apple
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.608a8.287 8.287 0 003 2.475A8.25 8.25 0 0115.362 5.214z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 002.25-2.25H9.75A2.25 2.25 0 0012 12.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v-.005A2.304 2.304 0 0114.305 5.25c0 .064-.006.126-.017.186" />
  </svg>
);

const mealSlotIcons: Record<MealSlot['type'], React.FC<{ className?: string }>> = {
  breakfast: BreakfastIconSVG,
  morningSnack: SnackIconSVG,
  lunch: LunchIconSVG,
  eveningSnack: SnackIconSVG,
  dinner: DinnerIconSVG,
};


// --- Mock Data ---
const mockMealOptions: MealOption[] = [
  { id: 'oatmeal-berries', name: 'Oatmeal with Berries', imageUrl: 'https://picsum.photos/seed/oatmeal-berries/300/200', nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 7 }, recipeId: 'oatmeal-berries', tags: ['High Fiber'] },
  { id: 'scrambled-eggs', name: 'Scrambled Eggs & Toast', imageUrl: 'https://picsum.photos/seed/scrambled-eggs/300/200', nutrition: { calories: 400, protein: 20, carbs: 30, fat: 20, fiber: 3 }, recipeId: 'scrambled-eggs', tags: ['High Protein'] },
  { id: 'chicken-salad', name: 'Grilled Chicken Salad', imageUrl: 'https://picsum.photos/seed/chickensalad/300/200', nutrition: { calories: 450, protein: 40, carbs: 20, fat: 25, fiber: 8 }, recipeId: 'chicken-salad', tags: ['Low Carb'] },
  { id: 'apple-pb', name: 'Apple with Peanut Butter', imageUrl: 'https://picsum.photos/seed/apple-pb/300/200', nutrition: { calories: 200, protein: 5, carbs: 25, fat: 10, fiber: 5 }, recipeId: 'apple-pb' },
  { id: 'quinoa-bowl', name: 'Quinoa Bowl with Veggies', imageUrl: 'https://picsum.photos/seed/quinoa-bowl/300/200', nutrition: { calories: 500, protein: 15, carbs: 70, fat: 18, fiber: 12 }, recipeId: 'quinoa-bowl', tags: ['Vegan'] },
  { id: 'greek-yogurt', name: 'Greek Yogurt with Honey', imageUrl: 'https://picsum.photos/seed/greek-yogurt/300/200', nutrition: { calories: 180, protein: 15, carbs: 20, fat: 5, fiber: 1 }, recipeId: 'greek-yogurt' },
  { id: 'salmon-asparagus', name: 'Baked Salmon & Asparagus', imageUrl: 'https://picsum.photos/seed/salmon-asparagus/300/200', nutrition: { calories: 550, protein: 45, carbs: 30, fat: 28, fiber: 6 }, recipeId: 'salmon-asparagus' },
];

const createDailyMealPlan = (date: Date): DailyMealPlan => {
  const dateString = date.toISOString().split('T')[0];
  const dayLabel = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return {
    date: dateString,
    dayLabel: dayLabel,
    mealSlots: [
      { type: 'breakfast', iconName: 'BreakfastIcon', colorStripe: 'bg-peach-300', options: [mockMealOptions[0], mockMealOptions[1]], selectedOptionId: mockMealOptions[0].id },
      { type: 'morningSnack', iconName: 'SnackIcon', colorStripe: 'bg-coral-300', options: [mockMealOptions[3]], selectedOptionId: mockMealOptions[3].id  },
      { type: 'lunch', iconName: 'LunchIcon', colorStripe: 'bg-melon-300', options: [mockMealOptions[2], mockMealOptions[4]], selectedOptionId: mockMealOptions[2].id },
      { type: 'eveningSnack', iconName: 'SnackIcon', colorStripe: 'bg-spicy-amber-300', options: [mockMealOptions[5]], selectedOptionId: mockMealOptions[5].id  },
      { type: 'dinner', iconName: 'DinnerIcon', colorStripe: 'bg-clay-400', options: [mockMealOptions[6]], selectedOptionId: mockMealOptions[6].id },
    ]
  };
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
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02] ${isSelected ? `ring-2 ring-${PRIMARY_COLOR_CLASS}-500` : ''}`}>
      <img src={option.imageUrl || `https://picsum.photos/seed/${option.id}/300/200`} alt={option.name} className="w-full h-32 object-cover" />
      <div className="p-3">
        <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate mb-1" title={option.name}>{option.name}</h4>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2">
          <NutrientDisplay icon={FireIcon} value={option.nutrition.calories} unit="kcal" label="Cal" colorClass="text-red-500 dark:text-red-400" />
          <NutrientDisplay icon={ProteinIcon} value={option.nutrition.protein} unit="g" label="Pro" colorClass="text-blue-500 dark:text-blue-400" />
          <NutrientDisplay icon={CarbsIcon} value={option.nutrition.carbs} unit="g" label="Carb" colorClass="text-yellow-600 dark:text-yellow-500" />
          <NutrientDisplay icon={FatIcon} value={option.nutrition.fat} unit="g" label="Fat" colorClass="text-purple-500 dark:text-purple-400" />
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


export const MealPlansScreen: React.FC<MealPlansScreenProps> = ({ navigateTo }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dailyPlans, setDailyPlans] = useState<{[date: string]: DailyMealPlan}>({});

  const currentDayPlan = useMemo(() => {
    const dateString = currentDate.toISOString().split('T')[0];
    if (dailyPlans[dateString]) {
      return dailyPlans[dateString];
    }
    // If not in state, create and store it (simulating fetching or generating)
    const newPlan = createDailyMealPlan(currentDate);
    setDailyPlans(prev => ({ ...prev, [dateString]: newPlan }));
    return newPlan;
  }, [currentDate, dailyPlans]);


  const handleDateChange = (daysToAdd: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + daysToAdd);
      return newDate;
    });
  };

  const handleSelectMeal = useCallback((mealSlotType: MealSlot['type'], optionId: string) => {
    const dateString = currentDate.toISOString().split('T')[0];
    setDailyPlans(prevPlans => {
      const updatedDayPlan = { ...prevPlans[dateString] };
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

  const dailyTotals = useMemo(() => {
    const totals: MealNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    currentDayPlan.mealSlots.forEach(slot => {
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
  }, [currentDayPlan]);

  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto pb-20 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">Your Meal Plan</h1>

      {/* Date Navigation */}
      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Button variant="ghost" onClick={() => handleDateChange(-1)} aria-label="Previous day">
          &larr; Prev
        </Button>
        <h2 className="text-lg font-semibold text-center text-gray-700 dark:text-gray-200">
          {currentDayPlan.dayLabel}
        </h2>
        <Button variant="ghost" onClick={() => handleDateChange(1)} aria-label="Next day">
          Next &rarr;
        </Button>
      </div>

      {/* Daily Nutrition Summary */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Daily Totals (Selected Meals)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-center">
            <NutrientDisplay icon={FireIcon} value={dailyTotals.calories} unit="kcal" label="Calories" colorClass="text-red-500" />
            <NutrientDisplay icon={ProteinIcon} value={dailyTotals.protein} unit="g" label="Protein" colorClass="text-blue-500" />
            <NutrientDisplay icon={CarbsIcon} value={dailyTotals.carbs} unit="g" label="Carbs" colorClass="text-yellow-600" />
            <NutrientDisplay icon={FatIcon} value={dailyTotals.fat} unit="g" label="Fat" colorClass="text-purple-500" />
            <NutrientDisplay icon={FiberIcon} value={dailyTotals.fiber} unit="g" label="Fiber" colorClass="text-green-500" />
        </div>
      </div>

      {/* Meal Slots */}
      {currentDayPlan.mealSlots.map(slot => {
        const SlotIcon = mealSlotIcons[slot.type] || ProteinIcon; // Fallback icon
        const mealTitle = slot.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        return (
          <section key={slot.type} className="p-1">
            <div className={`flex items-center mb-3 p-2 rounded-t-md ${slot.colorStripe || 'bg-gray-200 dark:bg-gray-700'}`}>
                <SlotIcon className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-200" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{mealTitle}</h3>
            </div>
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
