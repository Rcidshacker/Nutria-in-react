
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { Select } from '../../components/Select';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { HEALTH_CONDITIONS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

interface Step5HealthConditionProps {
  onNext: () => void;
}

export const Step5HealthCondition: React.FC<Step5HealthConditionProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [error, setError] = useState<string | undefined>();

  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'diabetic' | 'pcod-pcos' | 'thyroid';
    updateFormData({ healthCondition: value, diabeticStatus: '', pcodSeverity: '' }); // Reset conditional fields
    if (error) setError(undefined);
  };
  
  const handleConditionalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  }

  const validate = () => {
    if (!formData.healthCondition) {
      setError('Please select a health condition or concern.');
      return false;
    }
    if (formData.healthCondition === 'diabetic' && !formData.diabeticStatus) {
      setError('Please select your diabetes status.');
      return false;
    }
    if (formData.healthCondition === 'pcod-pcos' && !formData.pcodSeverity) {
      setError('Please select PCOD/PCOS severity.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const selectedCondition = HEALTH_CONDITIONS.find(c => c.id === formData.healthCondition);

  return (
    <StepWrapper title="What Brings You to Nutria?">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Understanding your health helps us personalize your experience.
      </p>
      <div className="space-y-4 mb-6">
        {HEALTH_CONDITIONS.map(condition => (
          <RadioCard
            key={condition.id}
            id={`condition-${condition.id}`}
            name="healthCondition"
            value={condition.id}
            label={condition.label}
            checked={formData.healthCondition === condition.id}
            onChange={handleConditionChange}
          />
        ))}
      </div>

      {selectedCondition?.conditionalOptions && (
        <div className="my-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-750">
          <Select
            label={selectedCondition.conditionalText || 'Additional Information'}
            id={formData.healthCondition === 'diabetic' ? 'diabeticStatus' : 'pcodSeverity'}
            name={formData.healthCondition === 'diabetic' ? 'diabeticStatus' : 'pcodSeverity'}
            options={selectedCondition.conditionalOptions}
            value={formData.healthCondition === 'diabetic' ? formData.diabeticStatus : formData.pcodSeverity}
            onChange={handleConditionalChange}
          />
        </div>
      )}
      {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}
      <Button onClick={handleNext} fullWidth>
        Next
      </Button>
    </StepWrapper>
  );
};
