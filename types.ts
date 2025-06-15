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
  age: string; // Use string for input, parse to number later
  height: string; // cm, use string for input
  weight: string; // kg, use string for input
  dietPreference: 'vegetarian' | 'non-vegetarian' | '';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extra-active' | '';
  gender: 'male' | 'female' | '';
  fitnessGoal: 'muscle-gain' | 'fat-loss' | 'maintenance' | '';
  healthCondition: 'diabetic' | 'pcod-pcos' | 'thyroid' | '';
  diabeticStatus?: 'controlled' | 'uncontrolled' | '';
  pcodSeverity?: 'mild' | 'moderate' | 'severe' | '';
  plan: 'nutria';
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string; // MM/YY
  cardCvv?: string;

  // Fields for Medical Report Upload & Extracted Data
  uploadedReportFile?: File | null; // For holding the selected file object transiently
  uploadedReportFileName?: string;
  reportPatientName?: string;
  reportDate?: string; // e.g., "2023-10-26"
  reportHba1c?: string; // e.g., "6.5%"
  reportGlucose?: string; // e.g., "120 mg/dL"
  reportHemoglobin?: string; // e.g., "14.1 g/dL"
  reportTsh?: string; // e.g., "2.5 mIU/L"
  reportRbc?: string; // Red Blood Cell count
  reportWbc?: string; // White Blood Cell count
  
  targetWeight?: string; // kg (Kept as user-set goal)

  // Fields for Address Management
  street?: string;
  locality?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;

  // Field for Nutrition Info
  calorieGoal?: string; // kcal
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

export interface MealNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface MealOption {
  id: string; // e.g., 'breakfast-option-1'
  name: string; // e.g., "Scrambled Eggs with Spinach"
  imageUrl?: string;
  nutrition: MealNutrition;
  recipeId?: string; // Optional: if this option directly links to a full recipe
  tags?: string[]; // e.g., ["High Protein", "Low Carb"]
}

export interface MealSlot {
  type: 'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner';
  iconName?: string; // For a specific icon like 'BreakfastIcon'
  colorStripe?: string; // e.g. 'bg-yellow-400'
  options: MealOption[];
  selectedOptionId?: string; // To mark if a user has selected an option for this slot
}

export interface DailyMealPlan {
  date: string; // e.g., "2024-07-30"
  dayLabel: string; // e.g., "Tuesday, Jul 30"
  mealSlots: MealSlot[];
}

export interface WeeklyMealPlan {
  weekId: string; // e.g., "2024-W31"
  days: DailyMealPlan[];
}

export interface IngredientItem {
  name: string;
  quantity: string; // e.g., "100g", "1 cup", "2 tbsp"
  notes?: string;
}
export interface IngredientCategory {
  categoryName: string; // e.g., "Curry Ingredients", "Vegetables"
  iconName?: string; // For an icon next to category name
  items: IngredientItem[];
}

export interface RecipeData {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  nutrition: MealNutrition;
  ingredientsCategorized?: IngredientCategory[]; // Preferred for detailed recipes
  ingredientsSimple?: string[]; // For simpler recipes without categories
  preparationSteps: string[];
  prepTime: string; // e.g., "15 mins"
  cookTime: string; // e.g., "30 mins"
  servings: number;
  tags?: string[]; // e.g., ["High Protein", "Vegan"]
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