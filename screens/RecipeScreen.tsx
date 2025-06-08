
import React from 'react';
import { Button } from '../components/Button';
import { AppRoute, RecipeData, IngredientCategory } from '../types'; // Added RecipeData and IngredientCategory
import { PRIMARY_COLOR_CLASS } from '../constants';

// --- Icons (Placeholder SVGs) ---
const FireIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 3.5a1.5 1.5 0 0 1 .5 2.915V9.75a.75.75 0 0 1-1.5 0V6.415A1.5 1.5 0 0 1 10 3.5Z" /><path fillRule="evenodd" d="M10 2c-1.101 0-1.976.843-2.09 1.913A3.001 3.001 0 0 0 6.25 7.55v2.117A3.999 3.999 0 0 0 6 11.75c0 1.48.806 2.768 1.981 3.422L6.06 18.25A.75.75 0 0 0 6.75 19h6.5a.75.75 0 0 0 .69-.75l-1.922-3.078A3.999 3.999 0 0 0 14 11.75c0-1.025-.387-1.956-.998-2.683V7.55A3.001 3.001 0 0 0 12.09 3.913C11.976 2.843 11.102 2 10 2Zm0 8.75a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5Z" clipRule="evenodd" /></svg>
);
const ProteinIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( // Using a generic "bolt" for protein/energy
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M11.75 3.25a.75.75 0 0 0-1.5 0V7h-3V3.25a.75.75 0 0 0-1.5 0V7h-.75C4.224 7 3.504 7.724 3.504 8.5S4.224 10 5.004 10h1.748l-1.993 5.478A.75.75 0 0 0 5.5 16.25h3.75V20a.75.75 0 0 0 1.5 0v-3.75h3V20a.75.75 0 0 0 1.5 0v-3.75h.75c.78 0 1.504-.724 1.504-1.5S15.784 10 15.004 10h-1.748l1.992-5.478A.75.75 0 0 0 14.5 3.75h-3.75V3.25Z" /></svg>
);
const CarbsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M12.5 3.226a2.25 2.25 0 0 0-2.063.303l-5.5 4.03A2.25 2.25 0 0 0 4.25 9.51v.981c0 .625.277 1.204.749 1.598l5.5 4.03a2.25 2.25 0 0 0 2.812-.001l5.5-4.03a2.25 2.25 0 0 0 .749-1.598v-.981a2.25 2.25 0 0 0-.687-1.951l-5.5-4.03A2.25 2.25 0 0 0 12.5 3.226Zm-1.324 1.34L7.676 7.5l3.5 2.563 3.5-2.563-3.5-2.937ZM6.5 9.088l3.5 2.563v5.098l-3.5-2.563V9.088Zm7 0v5.098l-3.5 2.563V11.65l3.5-2.563Z" clipRule="evenodd" /></svg>
);
const FatIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /><path fillRule="evenodd" d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" clipRule="evenodd" /></svg>
);
const FiberIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( // Leaf Icon for Fiber
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M15.28 9.116a.75.75 0 0 0-1.06-1.06l-4.22 4.22-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l4.75-4.75Z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 2a7.5 7.5 0 0 0-6.025 3.503.75.75 0 0 0 .083 1.035l1.25 1.25a.75.75 0 0 0 1.06-.083A5.003 5.003 0 0 1 10 5.5a.75.75 0 0 0 0-1.5A6.5 6.5 0 0 0 3.5 9a.75.75 0 0 0-1.5 0 8.001 8.001 0 0 0 6.25 7.943V17.5a.75.75 0 0 0 1.5 0v-.557A8.002 8.002 0 0 0 18 9a.75.75 0 0 0-1.5 0 6.5 6.5 0 0 1-5.5 5.5.75.75 0 0 0 0 1.5 5.001 5.001 0 0 1-3.417-1.342.75.75 0 0 0-1.035-.083l-1.25 1.25a.75.75 0 0 0 .083 1.035A7.5 7.5 0 0 0 10 18a7.5 7.5 0 0 0 7.488-6.817.75.75 0 0 0-.58-.87L10.25 8.057a.75.75 0 0 0-.832.059L5.602 11.1A.75.75 0 0 0 5.5 12.25v1.018a.75.75 0 0 0 1.5 0V12.5a5 5 0 0 1 3-4.568V6.75a.75.75 0 0 0 .75-.75 3.5 3.5 0 0 1 3.5-3.5.75.75 0 0 0 0-1.5Z" clipRule="evenodd" /></svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" /></svg>
);
const ServingsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => ( // Plate icon for servings
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2Z" /><path fillRule="evenodd" d="M10 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM11.34 6.157a.75.75 0 0 0-1.23-.908l-3.5 4.5A.75.75 0 0 0 7 10.5h1.25V14a.75.75 0 0 0 1.5 0v-3.5H11a.75.75 0 0 0 .668-.994l-.328-.649Z" clipRule="evenodd" /></svg>
);
const CurryIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM5 10a1 1 0 0 1 1-1h1.25a.75.75 0 0 0 0-1.5H6a2.5 2.5 0 0 0 0 5h1.25a.75.75 0 0 0 0-1.5H6a1 1 0 0 1-1-1Zm5.25.75a.75.75 0 0 0 0-1.5H9.5a.75.75 0 0 0 0 1.5h.75Zm2.5-.75a.75.75 0 0 1 .75.75 1 1 0 0 1-1 1h-.25a.75.75 0 0 1 0-1.5h.25a1 1 0 0 1 .25.03Zm.97 2.22a.75.75 0 0 0-1.054-1.054L12.25 12.586l-.384-.575a.75.75 0 0 0-1.224.816l.5.75a.75.75 0 0 0 .612.408h.002a.75.75 0 0 0 .614-.408l1.5-2.25Z" clipRule="evenodd" /></svg>
);
const VegetableIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M15.03 3.22a.75.75 0 0 1 0 1.06l-1.72 1.72h1.94a.75.75 0 0 1 0 1.5h-1.94l1.72 1.72a.75.75 0 1 1-1.06 1.06l-1.72-1.72v1.94a.75.75 0 0 1-1.5 0v-1.94l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72H6.47l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72V6.47L3.69 4.75a.75.75 0 1 1 1.06-1.06l1.72 1.72h1.94L6.69 3.77a.75.75 0 0 1 1.06-1.06l1.72 1.72v-1.94a.75.75 0 0 1 1.5 0v1.94l1.72-1.72a.75.75 0 0 1 1.06 0ZM8.5 8.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd" /></svg>
);


// Mock Recipe Data
const mockRecipes: { [key: string]: RecipeData } = {
  'oatmeal-berries': {
    id: 'oatmeal-berries', name: 'Oatmeal with Berries',
    imageUrl: 'https://picsum.photos/seed/oatmeal-berries/600/400',
    description: 'A hearty and healthy start to your day, packed with fiber and antioxidants.',
    nutrition: { calories: 350, protein: 10, carbs: 60, fat: 8, fiber: 7 },
    ingredientsCategorized: [
      { categoryName: 'Oats Base', items: [{ name: 'Rolled Oats', quantity: '1/2 cup' }, { name: 'Water or Milk', quantity: '1 cup' }, { name: 'Pinch of Salt', quantity: '1' }] },
      { categoryName: 'Toppings', items: [{ name: 'Mixed Berries (fresh or frozen)', quantity: '1/2 cup' }, { name: 'Chopped Nuts (almonds, walnuts)', quantity: '1 tbsp' }, { name: 'Chia Seeds', quantity: '1 tsp' }] }
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
      { categoryName: 'Chicken', iconName: 'ProteinIcon', items: [{ name: 'Chicken Breast (boneless, skinless)', quantity: '150g' }, { name: 'Olive Oil', quantity: '1 tsp' }, { name: 'Salt & Pepper', quantity: 'to taste' }] },
      { categoryName: 'Salad Base', iconName: 'VegetableIcon', items: [{ name: 'Mixed Greens (lettuce, spinach, arugula)', quantity: '3 cups' }, { name: 'Cherry Tomatoes (halved)', quantity: '1/2 cup' }, { name: 'Cucumber (sliced)', quantity: '1/2 cup' }, { name: 'Red Onion (thinly sliced)', quantity: '1/4 cup' }] },
      { categoryName: 'Dressing', items: [{ name: 'Lemon Juice', quantity: '1 tbsp' }, { name: 'Olive Oil (extra virgin)', quantity: '2 tbsp' }, { name: 'Dijon Mustard', quantity: '1 tsp' }] }
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
  'scrambled-eggs': { id: 'scrambled-eggs', name: 'Scrambled Eggs & Toast', imageUrl: 'https://picsum.photos/seed/scrambled-eggs-recipe/600/400', nutrition: { calories: 400, protein: 20, carbs: 30, fat: 20, fiber: 3 }, preparationSteps: ["Whisk eggs with a splash of milk, salt, and pepper.", "Cook in a non-stick pan over medium heat, stirring gently.", "Serve with whole-wheat toast."], prepTime: '5 mins', cookTime: '5 mins', servings: 1 },
  'apple-pb': { id: 'apple-pb', name: 'Apple with Peanut Butter', imageUrl: 'https://picsum.photos/seed/apple-pb-recipe/600/400', nutrition: { calories: 200, protein: 5, carbs: 25, fat: 10, fiber: 5 }, preparationSteps: ["Slice an apple.", "Spread peanut butter on slices."], prepTime: '3 mins', cookTime: '0 mins', servings: 1 },
  'quinoa-bowl': { id: 'quinoa-bowl', name: 'Quinoa Bowl with Veggies', imageUrl: 'https://picsum.photos/seed/quinoa-bowl-recipe/600/400', nutrition: { calories: 500, protein: 15, carbs: 70, fat: 18, fiber: 12 }, preparationSteps: ["Cook quinoa.", "Roast or steam favorite vegetables (broccoli, bell peppers, carrots).", "Combine quinoa and veggies in a bowl, add a light vinaigrette or tahini dressing."], prepTime: '15 mins', cookTime: '20 mins', servings: 1 },
  'greek-yogurt': { id: 'greek-yogurt', name: 'Greek Yogurt with Honey', imageUrl: 'https://picsum.photos/seed/greek-yogurt-recipe/600/400', nutrition: { calories: 180, protein: 15, carbs: 20, fat: 5, fiber: 1 }, preparationSteps: ["Scoop Greek yogurt into a bowl.", "Drizzle with honey. Add berries or nuts if desired."], prepTime: '2 mins', cookTime: '0 mins', servings: 1 },
  'salmon-asparagus': { id: 'salmon-asparagus', name: 'Baked Salmon & Asparagus', imageUrl: 'https://picsum.photos/seed/salmon-asparagus-recipe/600/400', nutrition: { calories: 550, protein: 45, carbs: 30, fat: 28, fiber: 6 }, preparationSteps: ["Preheat oven to 400°F (200°C).", "Season salmon fillet with lemon, dill, salt, and pepper.", "Toss asparagus with olive oil, salt, and pepper.", "Bake salmon and asparagus on a sheet pan for 12-15 minutes, or until salmon is cooked through and asparagus is tender-crisp."], prepTime: '10 mins', cookTime: '15 mins', servings: 1 },
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

  const ingredientCategoryIcons: Record<string, React.FC<{ className?: string }>> = {
    'Chicken': ProteinIcon,
    'Curry Ingredients': CurryIcon,
    'Vegetables': VegetableIcon,
    'Salad Base': VegetableIcon,
  };


  return (
    <div className="p-4 sm:p-6 max-w-screen-md mx-auto pb-10">
      <div className="flex items-center mb-4">
        <Button onClick={() => navigateTo('#/app/mealplans')} variant="ghost" size="sm" className={`text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 mr-2 p-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
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
        {(['prepTime', 'cookTime', 'servings'] as const).map(key => (
          <div key={key} className="bg-gray-100 dark:bg-gray-750 p-2 sm:p-3 rounded-lg shadow-sm transform transition-shadow duration-300 ease-in-out hover:shadow-md">
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
              {key === 'prepTime' && <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
              {key === 'cookTime' && <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
              {key === 'servings' && <ServingsIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
              <span className="text-xs uppercase tracking-wider">
                {key === 'prepTime' ? 'Prep Time' : key === 'cookTime' ? 'Cook Time' : 'Servings'}
              </span>
            </div>
            <p className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white">
              {recipe[key]} {key !== 'servings' && recipe[key] !== 'N/A' ? '' : ''}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
        <h2 className="text-xl font-semibold text-nutria-green-700 dark:text-nutria-green-400 mb-3">Nutrition Highlights</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
          {[
            { label: 'Calories', value: recipe.nutrition.calories, unit: 'kcal', icon: FireIcon, color: 'text-red-500' },
            { label: 'Protein', value: recipe.nutrition.protein, unit: 'g', icon: ProteinIcon, color: 'text-blue-500' },
            { label: 'Carbs', value: recipe.nutrition.carbs, unit: 'g', icon: CarbsIcon, color: 'text-yellow-600' },
            { label: 'Fat', value: recipe.nutrition.fat, unit: 'g', icon: FatIcon, color: 'text-purple-500' },
            { label: 'Fiber', value: recipe.nutrition.fiber, unit: 'g', icon: FiberIcon, color: 'text-green-500' },
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
        <h2 className="text-2xl font-semibold text-nutria-green-700 dark:text-nutria-green-400 mb-4">Ingredients</h2>
        {recipe.ingredientsCategorized && recipe.ingredientsCategorized.length > 0 ? (
          recipe.ingredientsCategorized.map((category, catIndex) => {
            const CategoryIcon = category.iconName ? ingredientCategoryIcons[category.iconName] || CurryIcon : CurryIcon; 
            return (
              <div key={catIndex} className="mb-5 p-4 bg-white dark:bg-gray-800 rounded-lg shadow transform transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <CategoryIcon className={`w-5 h-5 mr-2 text-${PRIMARY_COLOR_CLASS}-500`} />
                  {category.categoryName}
                </h3>
                <ul className="list-none pl-0 space-y-1.5">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 dark:text-gray-300 flex">
                      <span className={`w-1.5 h-1.5 bg-${PRIMARY_COLOR_CLASS}-400 rounded-full mr-2 mt-[0.4em] flex-shrink-0`}></span>
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
        <h2 className="text-2xl font-semibold text-nutria-green-700 dark:text-nutria-green-400 mb-4">How to Prepare</h2>
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
              <span key={tag} className="px-3 py-1 bg-nutria-green-100 text-nutria-green-700 dark:bg-nutria-green-700 dark:text-nutria-green-200 rounded-full text-xs font-medium transform transition-transform hover:scale-105">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
