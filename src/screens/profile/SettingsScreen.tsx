import React, { useState } from 'react';
import { Checkbox } from '../../components/Checkbox';
import { Button } from '../../components/Button';

export const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState({
    mealReminders: true,
    workoutReminders: true,
    progressUpdates: false,
    newsletter: true,
  });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveChanges = () => {
    alert('Settings saved (simulated)!');
    console.log('New Settings:', notifications);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">General Settings</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Notification Preferences</h3>
        <div className="space-y-3">
          <Checkbox
            label="Meal Reminders"
            id="mealReminders"
            name="mealReminders"
            checked={notifications.mealReminders}
            onChange={handleNotificationChange}
          />
          <Checkbox
            label="Workout Reminders"
            id="workoutReminders"
            name="workoutReminders"
            checked={notifications.workoutReminders}
            onChange={handleNotificationChange}
          />
          <Checkbox
            label="Weekly Progress Updates"
            id="progressUpdates"
            name="progressUpdates"
            checked={notifications.progressUpdates}
            onChange={handleNotificationChange}
          />
          <Checkbox
            label="Subscribe to Newsletter"
            id="newsletter"
            name="newsletter"
            checked={notifications.newsletter}
            onChange={handleNotificationChange}
          />
        </div>
      </div>

      <div className="mb-8">
         <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Account Actions</h3>
         <div className="space-y-3">
            <Button variant="outline" className="w-full sm:w-auto mr-0 sm:mr-2 text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => alert('Privacy Settings: Feature coming soon!')}>
                Privacy Settings
            </Button>
            <Button variant="outline" className="w-full sm:w-auto mr-0 sm:mr-2 text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => alert('Account Settings: Feature coming soon!')}>
                Account Settings
            </Button>
            <Button variant="outline" className="w-full sm:w-auto mr-0 sm:mr-2 text-red-600 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" onClick={() => alert('Change Password functionality not implemented.')}>
                Change Password
            </Button>
            <Button variant="outline" className="w-full sm:w-auto text-red-600 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" onClick={() => confirm('Are you sure you want to delete your account? This action cannot be undone.') ? alert('Account deletion request (simulated).') : null}>
                Delete Account
            </Button>
         </div>
      </div>

      <Button onClick={handleSaveChanges} fullWidth>
        Save Settings
      </Button>
    </div>
  );
};