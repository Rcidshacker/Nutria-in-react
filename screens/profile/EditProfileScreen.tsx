// --- START OF FILE screens/profile/EditProfileScreen.tsx ---

import React, { useState, useEffect } from 'react';
// FIX: Corrected import paths from ../../ to ../../components/ etc.
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext'; 
import { motion } from 'framer-motion';

export const EditProfileScreen: React.FC = () => {
  const { formData, updateFormData } = useSignUpForm(); 
  const [localFormData, setLocalFormData] = useState(formData);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setLocalFormData(formData);
    setIsModified(false);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    updateFormData(localFormData);
    alert('Profile changes saved!');
    console.log('Updated Profile Data:', localFormData);
    setIsModified(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Edit Your Profile</h2>
      
      <Input
        label="Full Name"
        id="fullName"
        name="fullName"
        value={localFormData.fullName}
        onChange={handleChange}
        placeholder="e.g. Jane Doe"
        containerClassName="mb-4"
      />
      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={localFormData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        containerClassName="mb-4"
        disabled 
      />
      <Input
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        value={localFormData.phone}
        onChange={handleChange}
        placeholder="+1234567890"
        containerClassName="mb-4"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input label="Age" name="age" type="number" value={localFormData.age} onChange={handleChange} />
        <Input label="Height (cm)" name="height" type="number" value={localFormData.height} onChange={handleChange} />
        <Input label="Weight (kg)" name="weight" type="number" value={localFormData.weight} onChange={handleChange} />
      </div>

      <Button onClick={handleSave} fullWidth className="mt-6" disabled={!isModified}>
        Save Changes
      </Button>
    </motion.div>
  );
};

// --- END OF FILE screens/profile/EditProfileScreen.tsx ---