
import React from 'react';
import { TabDefinition, AppRoute } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants';

interface BottomTabBarProps {
  tabs: TabDefinition[];
  currentPath: string; // e.g., '/home', '/mealplans' (the part after #/app)
  navigateTo: (route: AppRoute) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ tabs, currentPath, navigateTo }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-screen-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path || (currentPath === '/' && tab.path === '/home'); // Handle base path for home
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigateTo(`#/app${tab.path}`)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex flex-col items-center justify-center flex-1 p-2 text-sm 
                transform transition-all duration-150 ease-in-out
                ${isActive 
                  ? `text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 scale-105` // Active tab is slightly scaled
                  : `text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105 active:scale-95`
                }`}
            >
              <IconComponent className={`w-6 h-6 mb-1 ${isActive ? `text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400` : ''}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
