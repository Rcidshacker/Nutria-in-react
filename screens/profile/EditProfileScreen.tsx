import React, { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext'; 

export const EditProfileScreen: React.FC = () => {
  const { formData, updateFormData } = useSignUpForm(); 
  const [localFormData, setLocalFormData] = useState(formData);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Initialize local form data when component mounts or formData from context changes
    setLocalFormData(formData);
    setIsModified(false); // Reset modification status on new data
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleSave = () => {
    updateFormData(localFormData); // Update the context
    alert('Profile changes saved!');
    console.log('Updated Profile Data:', localFormData);
    setIsModified(false); // Reset modification status after save
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
    </div>
  );
};