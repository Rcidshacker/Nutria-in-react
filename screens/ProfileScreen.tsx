// --- START OF FILE screens/ProfileScreen.tsx ---

import React from 'react';
import { Button } from '../components/Button';
import { AppRoute } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants';
import { EditProfileScreen } from './profile/EditProfileScreen'; 
import { AppearanceScreen } from './profile/AppearanceScreen';
import { SettingsScreen } from './profile/SettingsScreen';
import { HelpSupportScreen } from './profile/HelpSupportScreen';
import { MedicalReportUploadScreen } from './profile/MedicalReportUploadScreen'; 
import { AddressManagementScreen } from './profile/AddressManagementScreen';
import { OrdersScreen } from './profile/OrdersScreen';
import { BlogScreen } from './profile/BlogScreen';

// UPDATED: Removed imports for the deleted screens and their icons
import {
  User,
  Palette,
  Settings2,
  HelpCircle,
  HeartPulse,
  MapPin,
  Package,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface ProfileScreenProps {
  subPath?: string; 
  navigateTo: (route: AppRoute) => void;
  onSignOut: () => void;
}

interface ProfileLink {
  id: string;
  label: string;
  icon: React.FC<{className?: string}>;
  pathSuffix: string; 
  screen: React.FC<any>; 
}

// UPDATED: Removed the links for BMI Calculator, Pricing, and Nutrition Info
const PROFILE_LINKS: ProfileLink[] = [
  { id: 'edit', label: 'Edit Profile', icon: User, pathSuffix: 'edit', screen: EditProfileScreen },
  { id: 'appearance', label: 'Appearance', icon: Palette, pathSuffix: 'appearance', screen: AppearanceScreen },
  { id: 'settings', label: 'Settings', icon: Settings2, pathSuffix: 'settings', screen: SettingsScreen },
  { id: 'orders', label: 'My Orders', icon: Package, pathSuffix: 'orders', screen: OrdersScreen },
  { id: 'medical-report', label: 'Upload/View Medical Report', icon: HeartPulse, pathSuffix: 'medical-report', screen: MedicalReportUploadScreen },
  { id: 'address', label: 'Address Management', icon: MapPin, pathSuffix: 'address', screen: AddressManagementScreen },
  { id: 'blog', label: 'Health Blog', icon: BookOpen, pathSuffix: 'blog', screen: BlogScreen },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, pathSuffix: 'help', screen: HelpSupportScreen },
];


export const ProfileScreen: React.FC<ProfileScreenProps> = ({ subPath, navigateTo, onSignOut }) => {
  const activeSubScreenId = subPath?.startsWith('/') ? subPath.substring(1) : '';
  const ActiveSubScreenLink = PROFILE_LINKS.find(link => link.pathSuffix === activeSubScreenId);
  const ActiveSubScreenComponent = ActiveSubScreenLink?.screen;

  const subScreenProps: any = { navigateTo, onSignOut };
  if (ActiveSubScreenLink?.id === 'medical-report') {
      subScreenProps.mode = 'profile';
  }

  if (ActiveSubScreenComponent) {
    return (
      <div className="p-4 sm:p-6 max-w-screen-md mx-auto">
        <Button onClick={() => navigateTo('#/app/profile')} variant="ghost" className="mb-4 inline-flex items-center text-sm">
          <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" /> 
          Back to Profile
        </Button>
        <ActiveSubScreenComponent {...subScreenProps} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-md mx-auto pb-20">
      <div className="text-center mb-8">
        <img 
          src={`https://i.pravatar.cc/150?u=user@example.com`} 
          alt="User Avatar" 
          className={`w-32 h-32 rounded-full mx-auto mb-4 border-4 border-${PRIMARY_COLOR_CLASS}-500 dark:border-${PRIMARY_COLOR_CLASS}-400`}
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jane Doe</h1>
        <p className={`text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-300`}>user@example.com</p>
      </div>

      <div className="space-y-3 mb-8">
        {PROFILE_LINKS.map(link => {
          const IconComponent = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => navigateTo(`#/app/profile/${link.pathSuffix}`)}
              className={`w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-left text-gray-700 dark:text-gray-200 transform transition-all duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.01] hover:translate-x-1`}
              aria-label={`Navigate to ${link.label}`}
            >
              <IconComponent className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
              <span className="flex-grow font-medium">{link.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </button>
          )
        })}
      </div>
      
      <Button onClick={onSignOut} variant="outline" fullWidth>
        Sign Out
      </Button>
       <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">App Version 1.0.0</p>
    </div>
  );
};

// --- END OF FILE screens/ProfileScreen.tsx ---