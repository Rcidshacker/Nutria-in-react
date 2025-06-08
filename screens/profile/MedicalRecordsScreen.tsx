import React from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { ACTIVITY_LEVELS, DIET_PREFERENCES } from '../../constants';

export const MedicalRecordsScreen: React.FC = () => {
  const { formData, updateFormData } = useSignUpForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSave = () => {
    alert('Medical records saved (simulated).');
    console.log('Updated Medical Data:', {
      height: formData.height,
      weight: formData.weight,
      reportGlucose: formData.reportGlucose, // Changed from glucoseLevel
      reportHba1c: formData.reportHba1c, // Changed from hba1c
      activityLevel: formData.activityLevel,
      dietPreference: formData.dietPreference,
      targetWeight: formData.targetWeight,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Medical Records</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Keep your health information up-to-date for better personalization. This information is kept confidential.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <Input
          label="Height (cm)"
          id="height"
          name="height"
          type="number"
          value={formData.height || ''}
          onChange={handleChange}
          placeholder="Your current height"
        />
        <Input
          label="Weight (kg)"
          id="weight"
          name="weight"
          type="number"
          value={formData.weight || ''}
          onChange={handleChange}
          placeholder="Your current weight"
        />
        <Input
          label="Target Weight (kg)"
          id="targetWeight"
          name="targetWeight"
          type="number"
          value={formData.targetWeight || ''}
          onChange={handleChange}
          placeholder="Your desired weight"
        />
        <Input
          label="Glucose Level (mg/dL - optional)"
          id="reportGlucose"
          name="reportGlucose" // Changed from glucoseLevel
          type="text" // Can be number, text for units if needed
          value={formData.reportGlucose || ''} // Changed from glucoseLevel
          onChange={handleChange}
          placeholder="e.g., 90"
        />
        <Input
          label="HbA1c (% - optional)"
          id="reportHba1c"
          name="reportHba1c" // Changed from hba1c
          type="text" // Can be number
          value={formData.reportHba1c || ''} // Changed from hba1c
          onChange={handleChange}
          placeholder="e.g., 5.7"
        />
        <Select
          label="Activity Level"
          id="activityLevel"
          name="activityLevel"
          options={ACTIVITY_LEVELS}
          value={formData.activityLevel || ''}
          onChange={handleChange}
          containerClassName="md:col-span-2"
        />
        <Select
          label="Food Preference"
          id="dietPreference"
          name="dietPreference"
          options={DIET_PREFERENCES}
          value={formData.dietPreference || ''}
          onChange={handleChange}
          containerClassName="md:col-span-2"
        />
      </div>

      <Button onClick={handleSave} fullWidth className="mt-8">
        Save Medical Records
      </Button>
    </div>
  );
};