// --- START OF FILE screens/profile/AppearanceScreen.tsx ---

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types';
import { PRIMARY_COLOR_CLASS } from '../../constants';
import { motion } from 'framer-motion'; // UPDATED: Import motion

export const AppearanceScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Appearance</h2>
      
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 mb-2">Change the look and feel of the application.</p>
      </div>

      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <span className="text-gray-700 dark:text-gray-300">
          Current Theme: <strong className={`capitalize text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`}>{theme}</strong>
        </span>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md text-white font-medium
            bg-${PRIMARY_COLOR_CLASS}-500 hover:bg-${PRIMARY_COLOR_CLASS}-600
            dark:bg-${PRIMARY_COLOR_CLASS}-600 dark:hover:bg-${PRIMARY_COLOR_CLASS}-700
            transition-colors`}
        >
          Switch to {theme === Theme.LIGHT ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Font Size (Coming Soon)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Adjust text size for better readability.</p>
         <div className="flex items-center space-x-2 mt-2 text-gray-400 dark:text-gray-500">
            <button className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">A-</button>
            <span className="text-lg">Aa</span>
            <button className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">A+</button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">High Contrast Mode (Coming Soon)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Enable high contrast for improved visibility.</p>
        <div className="mt-2">
            <label htmlFor="highContrastToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                <input type="checkbox" id="highContrastToggle" className="sr-only" disabled />
                <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-500 dark:text-gray-400">Enable High Contrast</div>
            </label>
        </div>
      </div>

    </motion.div>
  );
};

// --- END OF FILE screens/profile/AppearanceScreen.tsx ---