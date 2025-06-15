// --- START OF FILE screens/steps/Step3HealthInfo.tsx ---

import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { RadioCard } from '../../components/RadioCard';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { DIET_PREFERENCES, ACTIVITY_LEVELS, PRIMARY_COLOR_CLASS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

// FIX: Using the correct 'Mars' and 'Venus' icons from lucide-react
import { Mars, Venus } from 'lucide-react';

interface Step3HealthInfoProps {
  onNext: () => void;
}

export const Step3HealthInfo: React.FC<Step3HealthInfoProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
     if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ gender: e.target.value as 'male' | 'female' });
     if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: undefined }));
    }
  };
  
  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.age || isNaN(parseInt(formData.age)) || parseInt(formData.age) <=0) newErrors.age = 'Valid age is required.';
    if (!formData.height || isNaN(parseFloat(formData.height)) || parseFloat(formData.height) <=0) newErrors.height = 'Valid height is required.';
    if (!formData.weight || isNaN(parseFloat(formData.weight)) || parseFloat(formData.weight) <=0) newErrors.weight = 'Valid weight is required.';
    if (!formData.dietPreference) newErrors.dietPreference = 'Diet preference is required.';
    if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <StepWrapper title="Your Health Profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Age (Years)"
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
          placeholder="e.g. 25"
          min="1"
        />
        <Input
          label="Height (cm)"
          id="height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          error={errors.height}
          placeholder="e.g. 170"
           min="1"
        />
        <Input
          label="Weight (kg)"
          id="weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          error={errors.weight}
          placeholder="e.g. 65"
           min="1"
        />
      </div>
      
      <Select
        label="Diet Preference"
        id="dietPreference"
        name="dietPreference"
        options={DIET_PREFERENCES}
        value={formData.dietPreference}
        onChange={handleChange}
        error={errors.dietPreference}
      />
      <Select
        label="Activity Level"
        id="activityLevel"
        name="activityLevel"
        options={ACTIVITY_LEVELS}
        value={formData.activityLevel}
        onChange={handleChange}
        error={errors.activityLevel}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-1">Gender</label>
        <div className="grid grid-cols-2 gap-4">
          <RadioCard
            id="gender-male"
            name="gender"
            value="male"
            label="Male"
            icon={<Mars className={`w-6 h-6 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />}
            checked={formData.gender === 'male'}
            onChange={handleGenderChange}
          />
          <RadioCard
            id="gender-female"
            name="gender"
            value="female"
            label="Female"
            icon={<Venus className={`w-6 h-6 text-coral-500 dark:text-coral-400`} />}
            checked={formData.gender === 'female'}
            onChange={handleGenderChange}
          />
        </div>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
      </div>
      
      <Button onClick={handleNext} fullWidth className="mt-4">
        Next
      </Button>
    </StepWrapper>
  );
};

// --- END OF FILE screens/steps/Step3HealthInfo.tsx ---