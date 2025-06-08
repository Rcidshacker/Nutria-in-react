
import React from 'react';
import { Button } from '../components/Button';
import { AppRoute } from '../types';
import { PRIMARY_COLOR_CLASS } from '../constants';
import { EditProfileScreen } from './profile/EditProfileScreen'; 
import { AppearanceScreen } from './profile/AppearanceScreen';
import { SettingsScreen } from './profile/SettingsScreen';
import { HelpSupportScreen } from './profile/HelpSupportScreen';
import { BMICalculatorScreen } from './profile/BMICalculatorScreen';
import { MedicalReportUploadScreen } from './profile/MedicalReportUploadScreen'; 
import { AddressManagementScreen } from './profile/AddressManagementScreen';
import { PricingPlansScreen } from './profile/PricingPlansScreen';
import { NutritionInfoScreen } from './profile/NutritionInfoScreen';
import { OrdersScreen } from './profile/OrdersScreen';

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

const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);
const PaintBrushIcon: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
);
const CogIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-.962a8.97 8.97 0 0 1 5.721 2.06c.5.461.521 1.228.046 1.723l-.842 1.002a.96.96 0 0 0-.02.749l.43 1.002a1.002 1.002 0 0 1-.278 1.265l-.69.691a.5.5 0 0 0-.011.608l.01.011.01.011a.5.5 0 0 0 .608.011l.691-.69a1.002 1.002 0 0 1 1.265-.278l1.002.43a.96.96 0 0 0 .749-.02l1.002-.842c.496-.475 1.262-.454 1.723.046A8.97 8.97 0 0 1 21 12.406c.04.55-.42.998-.962 1.11a8.97 8.97 0 0 1-5.721-2.06c-.5-.461-.521-1.228-.046-1.723l.842-1.002a.96.96 0 0 0 .02-.749l-.43-1.002a1.002 1.002 0 0 1 .278-1.265l.69-.691a.5.5 0 0 0 .011-.608l-.01-.011-.01-.011a.5.5 0 0 0-.608.011l-.691.69a1.002 1.002 0 0 1-1.265.278l-1.002-.43a.96.96 0 0 0-.749.02l-1.002.842c-.496-.475-1.262.454-1.723-.046A8.97 8.97 0 0 1 3 12.406c-.04-.55.42-.998.962-1.11Z M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" /></svg>
);
const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>
);
const BMICalculatorIcon: React.FC<{className?: string}> = ({className}) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7 15.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V17h1.5v-1.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V17h1.5v-1.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V17H18v-1.5c0-.83-.67-1.5-1.5-1.5h-1c-.28 0-.5-.22-.5-.5V12c0-.28.22-.5.5-.5h1c.83 0 1.5-.67 1.5-1.5V9c0-.83-.67-1.5-1.5-1.5h-5C9.67 7.5 9 8.17 9 9v1.5c0 .83.67 1.5 1.5 1.5h1c.28 0 .5.22.5.5v1.5c0 .28-.22.5-.5.5h-1C9.67 14 9 14.67 9 15.5V17H7v-1.5Z"/></svg>
);
const MedicalRecordsIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><use href="#icon-medical-records"></use></svg>
);
const NutritionInfoIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><use href="#icon-nutrition-info"></use></svg>
);
const AddressManagementIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><use href="#icon-address"></use></svg>
);
const PricingPlansIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><use href="#icon-pricing-plans"></use></svg>
);
const OrdersIcon: React.FC<{className?: string}> = ({className}) => ( 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><use href="#icon-orders"></use></svg>
);


const PROFILE_LINKS: ProfileLink[] = [
  { id: 'edit', label: 'Edit Profile', icon: UserCircleIcon, pathSuffix: 'edit', screen: EditProfileScreen },
  { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon, pathSuffix: 'appearance', screen: AppearanceScreen },
  { id: 'settings', label: 'Settings', icon: CogIcon, pathSuffix: 'settings', screen: SettingsScreen },
  { id: 'orders', label: 'My Orders', icon: OrdersIcon, pathSuffix: 'orders', screen: OrdersScreen },
  { id: 'medical-report', label: 'Upload/View Medical Report', icon: MedicalRecordsIcon, pathSuffix: 'medical-report', screen: MedicalReportUploadScreen },
  { id: 'bmi', label: 'BMI Calculator', icon: BMICalculatorIcon, pathSuffix: 'bmi', screen: BMICalculatorScreen },
  { id: 'address', label: 'Address Management', icon: AddressManagementIcon, pathSuffix: 'address', screen: AddressManagementScreen },
  { id: 'pricing', label: 'Pricing Plans', icon: PricingPlansIcon, pathSuffix: 'pricing', screen: PricingPlansScreen },
  { id: 'nutrition', label: 'Nutrition Info', icon: NutritionInfoIcon, pathSuffix: 'nutrition', screen: NutritionInfoScreen },
  { id: 'help', label: 'Help & Support', icon: QuestionMarkCircleIcon, pathSuffix: 'help', screen: HelpSupportScreen },
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
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
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-nutria-green-500 dark:border-nutria-green-400"
        />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jane Doe</h1>
        <p className="text-nutria-green-600 dark:text-nutria-green-300">user@example.com</p>
      </div>

      <div className="space-y-3 mb-8">
        {PROFILE_LINKS.map(link => (
          <button
            key={link.id}
            onClick={() => {
              if (link.screen) {
                navigateTo(`#/app/profile/${link.pathSuffix}`);
              } else {
                alert(`${link.label} screen is not yet implemented.`);
              }
            }}
            className={`w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-left text-gray-700 dark:text-gray-200 transform transition-all duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.01] hover:translate-x-1`}
            aria-label={`Navigate to ${link.label}`}
          >
            <link.icon className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
            <span className="flex-grow font-medium">{link.label}</span>
            <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </button>
        ))}
      </div>
      
      <Button onClick={onSignOut} variant="outline" fullWidth>
        Sign Out
      </Button>
       <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">App Version 1.0.0</p>
    </div>
  );
};

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);
