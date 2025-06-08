
import React from 'react';
import { BottomTabBar } from '../components/BottomTabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { MealPlansScreen } from '../screens/MealPlansScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RecipeScreen } from '../screens/RecipeScreen'; 
import { BlogsScreen } from '../screens/BlogsScreen'; 
import { AppRoute, TabDefinition } from '../types';

// Define Tab Icons (simple placeholders)
const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);
const MealPlansIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
  </svg>
);
const ProgressIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);
const AnalysisIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
</svg>
);
const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);
const BlogsIcon: React.FC<{ className?: string }> = ({ className }) => ( // New Icon for Blogs
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25H5.625a2.25 2.25 0 0 1-2.25-2.25V6.375c0-.621.504-1.125 1.125-1.125H9M12 3.75a2.25 2.25 0 0 0-2.25 2.25v1.5M12 3.75a2.25 2.25 0 0 1 2.25 2.25v1.5" />
  </svg>
);


interface MainAppLayoutProps {
  currentRoute: AppRoute; // Full hash route like '#/app/home' or '#/app/profile/edit'
  onSignOut: () => void;
  navigateTo: (route: AppRoute) => void;
}

const TABS: TabDefinition[] = [
  { path: '/home', label: 'Home', icon: HomeIcon, screen: HomeScreen },
  { path: '/mealplans', label: 'Meals', icon: MealPlansIcon, screen: MealPlansScreen },
  { path: '/progress', label: 'Progress', icon: ProgressIcon, screen: ProgressScreen },
  { path: '/analysis', label: 'Analysis', icon: AnalysisIcon, screen: AnalysisScreen },
  { path: '/blogs', label: 'Blogs', icon: BlogsIcon, screen: BlogsScreen }, // Added Blogs tab
  { path: '/profile', label: 'Profile', icon: ProfileIcon, screen: ProfileScreen },
];

export const MainAppLayout: React.FC<MainAppLayoutProps> = ({ currentRoute, onSignOut, navigateTo }) => {
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
    // Fallback to home if no specific match and not a recognized pattern like /recipe
    // Or handle as a "Not Found" case if preferred
    ActiveScreenComponent = HomeScreen; // Default to HomeScreen component type
  }


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-4 sm:pt-6 md:pt-8 pb-20"> {/* Responsive top padding, consistent bottom padding */}
        { ActiveScreenComponent ? <ActiveScreenComponent {...screenProps} /> : <div>Page not found in App. Check MainAppLayout.tsx routing. Current route: {currentRoute}</div> }
      </main>
      <BottomTabBar tabs={TABS} currentPath={mainPathSegment} navigateTo={navigateTo} />
    </div>
  );
};
