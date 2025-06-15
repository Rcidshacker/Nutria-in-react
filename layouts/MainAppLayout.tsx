// --- START OF FILE layouts/MainAppLayout.tsx ---

import React, { useEffect } from 'react'; // UPDATED: Imported useEffect
import { BottomTabBar } from '../components/BottomTabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { MealPlansScreen } from '../screens/MealPlansScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RecipeScreen } from '../screens/RecipeScreen'; 
import { ScanScreen } from '../screens/ScanScreen';
import { AppRoute, TabDefinition } from '../types';
import { Home, Soup, LineChart, PieChart, User, ScanLine } from 'lucide-react';

interface MainAppLayoutProps {
  currentRoute: AppRoute;
  onSignOut: () => void;
  navigateTo: (route: AppRoute) => void;
}

const TABS: TabDefinition[] = [
  { path: '/home', label: 'Home', icon: Home, screen: HomeScreen },
  { path: '/mealplans', label: 'Meals', icon: Soup, screen: MealPlansScreen },
  { path: '/progress', label: 'Progress', icon: LineChart, screen: ProgressScreen },
  { path: '/analysis', label: 'Analysis', icon: PieChart, screen: AnalysisScreen },
  { path: '/scan', label: 'Scan', icon: ScanLine, screen: ScanScreen },
  { path: '/profile', label: 'Profile', icon: User, screen: ProfileScreen },
];

export const MainAppLayout: React.FC<MainAppLayoutProps> = ({ currentRoute, onSignOut, navigateTo }) => {
  // --- FIX: Add a useEffect hook to scroll to top on route change ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]); // Dependency array ensures this runs every time the route changes

  const baseAppPath = currentRoute.startsWith('#/app') ? currentRoute.substring(5) : '/home';
  const mainPathSegment = '/' + (baseAppPath.split('/')[1] || 'home');

  let ActiveScreenComponent: React.FC<any> | undefined = undefined;
  let screenProps: any = { onSignOut, navigateTo }; 

  const activeTab = TABS.find(tab => mainPathSegment === tab.path);

  if (activeTab) {
    ActiveScreenComponent = activeTab.screen;
    if (activeTab.path === '/profile') {
        screenProps.subPath = baseAppPath.substring(activeTab.path.length); 
    }
  } else if (baseAppPath.startsWith('/recipe')) {
    ActiveScreenComponent = RecipeScreen;
    const recipeIdMatch = baseAppPath.match(/id=([^&]+)/);
    screenProps.recipeId = recipeIdMatch ? recipeIdMatch[1] : null;
  } else {
    ActiveScreenComponent = HomeScreen;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-4 sm:pt-6 md:pt-8 pb-20">
        { ActiveScreenComponent ? <ActiveScreenComponent {...screenProps} /> : <div>Page not found in App. Check MainAppLayout.tsx routing. Current route: {currentRoute}</div> }
      </main>
      <BottomTabBar tabs={TABS} currentPath={mainPathSegment} navigateTo={navigateTo} />
    </div>
  );
};

// --- END OF FILE layouts/MainAppLayout.tsx ---