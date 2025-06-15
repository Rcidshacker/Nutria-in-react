// --- START OF FILE screens/RecipeScreen.tsx ---

import React from 'react';
import { Button } from '../components/Button';
import { AppRoute, RecipeData } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants';

import {
  Flame,
  Beef,
  Wheat,
  Droplet,
  Leaf,
  Clock,
  Users,
  Utensils,
  Carrot,
  ChevronLeft,
} from 'lucide-react';

const mockRecipes: { [key: string]: RecipeData } = {
  'oatmeal-berries': {
    id: 'oatmeal-berries', name: 'Oatmeal with Berries',
    imageUrl: 'https://picsum.photos/seed/oatmeal-berries/600/400',
    description: 'A hearty and healthy start to your day, packed with fiber and antioxidants.',
    nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 7 },
    ingredientsCategorized: [
      { categoryName: 'Oats Base', iconName: 'Wheat', items: [{ name: 'Rolled Oats', quantity: '1/2 cup' }, { name: 'Water or Milk', quantity: '1 cup' }, { name: 'Pinch of Salt', quantity: '1' }] },
      { categoryName: 'Toppings', iconName: 'Leaf', items: [{ name: 'Mixed Berries (fresh or frozen)', quantity: '1/2 cup' }, { name: 'Chopped Nuts (almonds, walnuts)', quantity: '1 tbsp' }, { name: 'Chia Seeds', quantity: '1 tsp' }] }
    ],
    preparationSteps: [
      "Combine oats, water/milk, and salt in a saucepan.",
      "Bring to a boil, then reduce heat and simmer for 5-7 minutes, stirring occasionally, until thickened.",
      "Pour into a bowl and top with mixed berries, nuts, and chia seeds."
    ],
    prepTime: '5 mins', cookTime: '7 mins', servings: 1,
    tags: ['Breakfast', 'Vegan Option', 'High Fiber']
  },
  'chicken-salad': {
    id: 'chicken-salad', name: 'Classic Grilled Chicken Salad',
    imageUrl: 'https://picsum.photos/seed/chickensalad-recipe/600/400',
    description: 'A light yet satisfying salad with lean grilled chicken and fresh vegetables.',
    nutrition: { calories: 450, protein: 40, carbs: 20, fat: 25, fiber: 8 },
    ingredientsCategorized: [
      { categoryName: 'Chicken', iconName: 'Beef', items: [{ name: 'Chicken Breast (boneless, skinless)', quantity: '150g' }, { name: 'Olive Oil', quantity: '1 tsp' }, { name: 'Salt & Pepper', quantity: 'to taste' }] },
      { categoryName: 'Salad Base', iconName: 'Carrot', items: [{ name: 'Mixed Greens (lettuce, spinach, arugula)', quantity: '3 cups' }, { name: 'Cherry Tomatoes (halved)', quantity: '1/2 cup' }, { name: 'Cucumber (sliced)', quantity: '1/2 cup' }, { name: 'Red Onion (thinly sliced)', quantity: '1/4 cup' }] },
      { categoryName: 'Dressing', iconName: 'Utensils', items: [{ name: 'Lemon Juice', quantity: '1 tbsp' }, { name: 'Olive Oil (extra virgin)', quantity: '2 tbsp' }, { name: 'Dijon Mustard', quantity: '1 tsp' }] }
    ],
    preparationSteps: [
      "Season chicken breast with salt, pepper, and a little olive oil. Grill or pan-sear until cooked through. Let it rest, then slice.",
      "In a large bowl, combine mixed greens, cherry tomatoes, cucumber, and red onion.",
      "In a small bowl, whisk together lemon juice, olive oil, and Dijon mustard for the dressing.",
      "Add sliced grilled chicken to the salad. Drizzle with dressing and toss gently to combine.",
      "Serve immediately."
    ],
    prepTime: '15 mins', cookTime: '10 mins', servings: 1,
    tags: ['Lunch', 'High Protein', 'Low Carb', 'Healthy']
  },
  // ... other mock recipes
};


interface RecipeScreenProps {
  recipeId?: string | null;
  navigateTo: (route: AppRoute) => void;
}

export const RecipeScreen: React.FC<RecipeScreenProps> = ({ recipeId, navigateTo }) => {
  if (!recipeId || !mockRecipes[recipeId]) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400">Recipe not found!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">The recipe ID "{recipeId}" is invalid or the recipe doesn't exist.</p>
        <Button onClick={() => navigateTo('#/app/mealplans')} className="mt-4">Back to Meal Plans</Button>
      </div>
    );
  }

  const recipe = mockRecipes[recipeId];

  const ingredientCategoryIcons: { [key: string]: React.FC<{ className?: string }> } = {
    Beef: Beef,
    Carrot: Carrot,
    Utensils: Utensils,
    Wheat: Wheat,
    Leaf: Leaf,
    Default: Utensils,
  };


  return (
    <div className="p-4 sm:p-6 max-w-screen-md mx-auto pb-10">
      <div className="flex items-center mb-4">
        <Button onClick={() => navigateTo('#/app/mealplans')} variant="ghost" size="sm" className={`text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mr-2 p-1`}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white truncate flex-1">{recipe.name}</h1>
      </div>

      <img 
        src={recipe.imageUrl || `https://picsum.photos/seed/${recipe.id}/800/400`} 
        alt={recipe.name} 
        className="rounded-xl mb-6 w-full object-cover h-52 sm:h-72 shadow-lg"
      />
      
      {recipe.description && <p className="text-gray-600 dark:text-gray-300 mb-6 italic">{recipe.description}</p>}

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 text-center">
        {[
          { key: 'prepTime', icon: Clock },
          { key: 'cookTime', icon: Clock },
          { key: 'servings', icon: Users },
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="bg-gray-100 dark:bg-cocoa-700/50 p-2 sm:p-3 rounded-lg shadow-sm transform transition-shadow duration-300 ease-in-out hover:shadow-md">
              <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                <span className="text-xs uppercase tracking-wider">
                  {item.key === 'prepTime' ? 'Prep' : item.key === 'cookTime' ? 'Cook' : 'Servings'}
                </span>
              </div>
              {/* --- FIX START --- */}
              <p className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white">
                {String(recipe[item.key as keyof RecipeData])}
              </p>
              {/* --- FIX END --- */}
            </div>
          );
        })}
      </div>
      
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
        <h2 className={`text-xl font-semibold text-${PRIMARY_COLOR_CLASS}-700 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-3`}>Nutrition Highlights</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {[
            { label: 'Calories', value: recipe.nutrition.calories, unit: 'kcal', icon: Flame, color: 'text-red-500' },
            { label: 'Protein', value: recipe.nutrition.protein, unit: 'g', icon: Beef, color: 'text-blue-500' },
            { label: 'Carbs', value: recipe.nutrition.carbs, unit: 'g', icon: Wheat, color: 'text-yellow-600' },
            { label: 'Fat', value: recipe.nutrition.fat, unit: 'g', icon: Droplet, color: 'text-purple-500' },
            { label: 'Fiber', value: recipe.nutrition.fiber, unit: 'g', icon: Leaf, color: 'text-green-500' },
          ].map(item => item.value !== undefined && (
            <div key={item.label} className="flex items-center">
              <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 ${item.color}`} />
              <div>
                <span className="block text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                <strong className="text-gray-700 dark:text-gray-200">{item.value}{item.unit}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className={`text-2xl font-semibold text-${PRIMARY_COLOR_CLASS}-700 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>Ingredients</h2>
        {recipe.ingredientsCategorized && recipe.ingredientsCategorized.length > 0 ? (
          recipe.ingredientsCategorized.map((category, catIndex) => {
            const CategoryIcon = category.iconName ? (ingredientCategoryIcons[category.iconName] || ingredientCategoryIcons.Default) : ingredientCategoryIcons.Default; 
            return (
              <div key={catIndex} className="mb-5 p-4 bg-white dark:bg-gray-800 rounded-lg shadow transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <CategoryIcon className={`w-5 h-5 mr-2 text-${PRIMARY_COLOR_CLASS}-500`} />
                  {category.categoryName}
                </h3>
                <ul className="list-none pl-0 space-y-1.5">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 dark:text-gray-300 flex">
                      <span className={`w-1.5 h-1.5 bg-${PRIMARY_COLOR_CLASS}-400 rounded-full mr-2.5 mt-[0.4em] flex-shrink-0`}></span>
                      <span><strong>{item.quantity}</strong> {item.name} {item.notes && `(${item.notes})`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : recipe.ingredientsSimple && recipe.ingredientsSimple.length > 0 ? (
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
            <ul className="list-disc list-inside space-y-1">
              {recipe.ingredientsSimple.map((ing, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{ing}</li>
              ))}
            </ul>
          </div>
        ) : <p className="text-gray-500 dark:text-gray-400">Ingredients not listed.</p>}
      </div>

      <div>
        <h2 className={`text-2xl font-semibold text-${PRIMARY_COLOR_CLASS}-700 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>How to Prepare</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4 transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
           {recipe.preparationSteps.map((step, index) => (
            <div key={index} className="flex items-start">
              <span className={`mr-3 flex-shrink-0 bg-${PRIMARY_COLOR_CLASS}-500 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center font-semibold`}>
                {index + 1}
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
      
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map(tag => (
              <span key={tag} className={`px-3 py-1 bg-${PRIMARY_COLOR_CLASS}-100 text-${PRIMARY_COLOR_CLASS}-800 dark:bg-cocoa-700 dark:text-${PRIMARY_COLOR_CLASS}-300 rounded-full text-xs font-medium transform transition-transform hover:scale-105`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- END OF FILE screens/RecipeScreen.tsx ---