// --- START OF FILE: layouts/MainAppLayout.tsx ---

import React, { useEffect } from 'react';
import { BottomTabBar } from '../components/BottomTabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { MealPlansScreen } from '../screens/MealPlansScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RecipeScreen } from '../screens/RecipeScreen'; 
import { ScanScreen } from '../screens/ScanScreen';
import { AppRoute, TabDefinition, User as UserType } from '../types';
import { Home, Soup, LineChart, PieChart, User, ScanLine } from 'lucide-react';

interface MainAppLayoutProps {
  user: UserType;
  onSignOut: () => void;
}

const TABS: TabDefinition[] = [
  { path: '/home', label: 'Home', icon: Home, screen: HomeScreen },
  { path: '/mealplans', label: 'Meals', icon: Soup, screen: MealPlansScreen },
  { path: '/progress', label: 'Progress', icon: LineChart, screen: ProgressScreen },
  { path: '/analysis', label: 'Analysis', icon: PieChart, screen: AnalysisScreen },
  { path: '/scan', label: 'Scan', icon: ScanLine, screen: ScanScreen },
  { path: '/profile', label: 'Profile', icon: User, screen: ProfileScreen },
];

export const MainAppLayout: React.FC<MainAppLayoutProps> = ({ user, onSignOut }) => {
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash || '#/app/home');

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash || '#/app/home');
    window.addEventListener('hashchange', handleHashChange);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const navigateTo = (route: AppRoute) => {
    window.location.hash = route;
  };

  const baseAppPath = currentRoute.startsWith('#/app') ? currentRoute.substring(5) : '/home';
  const mainPathSegment = '/' + (baseAppPath.split('/')[1] || 'home');
  const activeTab = TABS.find(tab => mainPathSegment === tab.path);

  let ActiveScreenComponent: React.FC<any> = HomeScreen; // Default to HomeScreen
  let screenProps: any = { user, navigateTo }; // Base props for most screens

  if (baseAppPath.startsWith('/recipe')) {
    ActiveScreenComponent = RecipeScreen;
    screenProps.recipeId = baseAppPath.match(/id=([^&]+)/)?.[1];
  } else if (activeTab) {
    ActiveScreenComponent = activeTab.screen;
    // FIX: Add specific props only for the ProfileScreen
    if (activeTab.path === '/profile') {
      screenProps.onSignOut = onSignOut;
      // FIX: Check if activeTab exists before accessing its path
      screenProps.subPath = baseAppPath.substring(activeTab.path.length);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-4 sm:pt-6 md:pt-8 pb-20">
        <ActiveScreenComponent {...screenProps} />
      </main>
      <BottomTabBar tabs={TABS} currentPath={mainPathSegment} navigateTo={navigateTo} />
    </div>
  );
};

// --- END OF FILE: layouts/MainAppLayout.tsx ---