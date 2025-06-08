
import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';
import { RadioCard } from '../../components/RadioCard';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { DIET_PREFERENCES, ACTIVITY_LEVELS, PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

interface Step3HealthInfoProps {
  onNext: () => void;
}

const MaleIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 5.69 3.117L12 21.75l-5.69-6.633Z" clipRule="evenodd" />
     <path d="M12 12.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H12Zm-.832 4.501a11.196 11.196 0 0 1-4.043-2.116l.07-.044a9.67 9.67 0 0 0 3.973 2.16ZM12.832 17.25a11.196 11.196 0 0 0 4.043-2.116l-.07-.044a9.67 9.67 0 0 1-3.973 2.16Z" />
  </svg>
);

const FemaleIcon: React.FC<{className?: string}> = ({className}) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06l-2.47-2.47V10.5a.75.75 0 0 1-1.5 0V4.81L8.78 7.28a.75.75 0 0 1-1.06-1.06l3.75-3.75ZM12 14.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" clipRule="evenodd" />
     <path d="M12 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
  </svg>
);


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
            icon={<MaleIcon className={`w-6 h-6 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />}
            checked={formData.gender === 'male'}
            onChange={handleGenderChange}
          />
          <RadioCard
            id="gender-female"
            name="gender"
            value="female"
            label="Female"
            icon={<FemaleIcon className={`w-6 h-6 text-coral-500 dark:text-coral-400`} />}
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