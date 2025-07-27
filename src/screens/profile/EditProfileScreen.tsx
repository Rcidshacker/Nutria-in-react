// --- START OF FILE: screens/profile/EditProfileScreen.tsx ---

import React, { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext'; // UPDATED: Use the new AuthContext
import { motion } from 'framer-motion';
import { User } from '../../types';

export const EditProfileScreen: React.FC = () => {
  // Get user and the new updateUser function from our context
  const { user, updateUser } = useAuth();

  // Local state to manage the form fields without affecting the global state on every keystroke
  const [localFormData, setLocalFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    age: user?.age.toString() || '',
    height: user?.height.toString() || '',
    weight: user?.weight.toString() || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // This ensures the form resets if the user data in the context changes for any reason
  useEffect(() => {
    if (user) {
        setLocalFormData({
            name: user.name,
            phone: user.phone,
            age: user.age.toString(),
            height: user.height.toString(),
            weight: user.weight.toString(),
        });
        setIsModified(false);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setIsModified(true); // Mark the form as modified
  };

  // This function now calls our API service via the context
  const handleSave = async () => {
    if (!isModified) return;
    setIsLoading(true);
    try {
        // Prepare only the fields that can be updated
        const updatePayload: Partial<User> = {
            name: localFormData.name,
            phone: localFormData.phone,
            age: Number(localFormData.age),
            height: Number(localFormData.height),
            weight: Number(localFormData.weight),
        };
        await updateUser(updatePayload);
        alert('Profile updated successfully!');
        setIsModified(false); // Reset modification status after a successful save
    } catch (error) {
        alert('Failed to update profile. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Edit Your Profile</h2>
      
      <div className="space-y-4">
        <Input
          label="Full Name" id="name" name="name"
          value={localFormData.name} onChange={handleChange}
        />
        {/* Email is typically not editable, so it's disabled */}
        <Input label="Email Address" id="email" name="email" type="email" value={user?.email || ''} disabled />
        <Input
          label="Phone Number" id="phone" name="phone" type="tel"
          value={localFormData.phone} onChange={handleChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Age" name="age" type="number" value={localFormData.age} onChange={handleChange} />
          <Input label="Height (cm)" name="height" type="number" value={localFormData.height} onChange={handleChange} />
          <Input label="Weight (kg)" name="weight" type="number" value={localFormData.weight} onChange={handleChange} />
        </div>
      </div>

      <Button onClick={handleSave} fullWidth className="mt-6" isLoading={isLoading} disabled={!isModified || isLoading}>
        Save Changes
      </Button>
    </motion.div>
  );
};

// --- END OF FILE: screens/profile/EditProfileScreen.tsx ---