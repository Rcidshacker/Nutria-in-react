// ADD THIS NEW INTERFACE AT THE TOP

export interface User {
  id: string;
  email: string;
  name: string;
    phone: string; // <--- ADD THIS LINE
  age: number;
  gender: string;
  height: number;
  weight: number;
  activity_level: string;
  diet: string;
  health_condition?: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreedToTerms: boolean;
  age: string;
  height: string;
  weight: string;
  dietPreference: 'vegetarian' | 'non-vegetarian' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extra-active' | '';
  gender: 'male' | 'female' | '';
  fitnessGoal: 'muscle-gain' | 'fat-loss' | 'maintenance' | '';
  healthCondition: 'diabetic' | 'pcod-pcos' | 'thyroid' | '';
  
  // FIX: Add the new region field here
  region: 'north' | 'south' | 'east' | 'west' | '';

  diabeticStatus?: 'controlled' | 'uncontrolled' | '';
  pcodSeverity?: 'mild' | 'moderate' | 'severe' | '';
  plan: 'nutria';
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  uploadedReportFile?: File | null;
  uploadedReportFileName?: string;
  reportPatientName?: string;
  reportDate?: string;
  reportHba1c?: string;
  reportGlucose?: string;
  reportHemoglobin?: string;
  reportTsh?: string;
  reportRbc?: string;
  reportWbc?: string;
  targetWeight?: string;
  street?: string;
  locality?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  calorieGoal?: string;
}

export type SignUpStep = number; // Changed to number for flexibility

export interface Plan {
  id: 'nutria';
  name: string;
  price?: string;
  features: string[];
}

export interface FitnessGoal {
  id: 'muscle-gain' | 'fat-loss' | 'maintenance';
  emoji: string;
  title: string;
  description: string;
}

export interface HealthConditionOption {
  id: 'diabetic' | 'pcod-pcos' | 'thyroid';
  label: string;
  conditionalText?: string;
  conditionalOptions?: { value: string; label: string }[];
}

export type PaymentMethod = 'upi' | 'visa' | 'mastercard' | 'rupay' | '';

// New types for navigation
export type AppRoute = string; // Using string for flexibility with hash routes like '#/app/home'

export interface TabDefinition {
  path: string; // e.g., '/home', '/mealplans' (will be prefixed with #/app)
  label: string;
  icon: React.FC<{ className?: string }>;
  screen: React.FC<any>; // Screen component for this tab
}

// --- Meal Plans & Recipe Types ---
// --- ADD these new, backend-aligned types ---
export interface ApiMeal {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;      // ADDED: to match backend MealBase
  fiber: number;     // KEPT: for display purposes
  ingredients: string[];
  instructions: string;
  meal_type?: string; // ADDED: for grouping on the frontend
}

// This type is no longer needed as the backend sends a flat list per day
// export interface ApiMealPlan { ... }

export interface ApiIngredient {
  Ingredient: string;
  "Total Amount (g)": number;
}

// This is the main object returned by the API
export interface ApiDietPlan {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  daily_calories: number;
  meals_per_day: number;
  // The backend returns a dictionary where keys are "Day 1", "Day 2", etc.
  // and values are a flat list of all meals for that day.
  meal_plan: {
    [day: string]: ApiMeal[];
  };
}

// --- Progress Tracking Types ---
export interface WeightEntry {
  id: string;
  date: string; // ISO string e.g. "2024-07-30"
  value: number; // in kg or lbs, unit preference stored elsewhere
  notes?: string;
}

export interface MeasurementEntry {
  id: string;
  metricName: 'bodyFat' | 'waist' | 'hips' | 'chest'; // Extendable
  date: string;
  value: number; // unit specific to metric (%, cm, in)
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  imageUrl: string; // URL to the stored image
  thumbnailUrl?: string; // Optional smaller version
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  iconName: string; // Name of an icon (e.g., 'trophy', 'star', 'weightLoss5kg')
  dateAchieved: string; // ISO string
  color?: string; // Optional color for the badge (e.g., 'gold', 'silver')
}

// --- Analysis Screen Types ---
export interface MacroData {
  grams: number;
  percentage: number; // Percentage of daily goal or total intake
  goalGrams?: number; // Optional daily goal in grams
}

export interface TodayProgressData {
  totalCalories: number;
  calorieGoal?: number;
  protein: MacroData;
  carbs: MacroData;
  fat: MacroData;
}

export interface WeeklyProgressData {
  averageDailyCalories: number;
  averageProtein: MacroData;
  averageCarbs: MacroData;
  averageFat: MacroData;
}

export interface DailyCalorieLog {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  calories: number;
}

export interface WeightPoint {
  date: string; // e.g., "Jul 1", "Mon"
  weight: number;
}

// --- Orders Screen Types ---
export interface SavedMealItem {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  quantity: number;
}

export interface PaymentOptionType {
  id: PaymentMethod; // Re-use PaymentMethod for consistency
  label: string;
  icon: React.FC<{ className?: string }>;
}

// --- START: New Types for Meal Scan (OCV) Screen ---

export interface OCVNutrients {
  protein: string;
  fat: string;
  carbs: string;
  calories: string;
}

export interface OCVAnalysisResult {
  dishName: string;
  quantity: string;
  portionSize: string;
  nutrients: OCVNutrients;
  ingredients: string;
  confidence: number;
}

export interface OCVSmartSuggestion {
  type: 'positive' | 'warning' | 'negative';
  text: string;
  icon: string; // Emoji
}

// --- END: New Types for Meal Scan (OCV) Screen ---
// --- Types for Blog Screen ---
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
}

// --- START: New Type for Recipe Screen ---
export interface RecipeData {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  ingredientsCategorized: {
    categoryName: string;
    iconName: string;
    items: {
      name: string;
      quantity: string;
      notes?: string;
    }[];
  }[];
  ingredientsSimple?: string[];
  preparationSteps: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  tags: string[];
}
// --- END: New Type for Recipe Screen ---
