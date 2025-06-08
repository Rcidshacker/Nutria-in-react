
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { FITNESS_GOALS } from '../../constants';
import { StepWrapper } from '../../components/StepWrapper';

interface Step4FitnessGoalProps {
  onNext: () => void;
}

export const Step4FitnessGoal: React.FC<Step4FitnessGoalProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [error, setError] = useState<string | undefined>();

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ fitnessGoal: e.target.value as any });
    if (error) setError(undefined);
  };

  const validate = () => {
    if (!formData.fitnessGoal) {
      setError('Please select a fitness goal.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <StepWrapper title="What's Your Fitness Goal?">
      <div className="space-y-4 mb-6">
        {FITNESS_GOALS.map(goal => (
          <RadioCard
            key={goal.id}
            id={`goal-${goal.id}`}
            name="fitnessGoal"
            value={goal.id}
            label={goal.title}
            description={goal.description}
            icon={<span className="text-2xl">{goal.emoji}</span>}
            checked={formData.fitnessGoal === goal.id}
            onChange={handleGoalChange}
          />
        ))}
      </div>
      {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}
      <Button onClick={handleNext} fullWidth>
        Next
      </Button>
    </StepWrapper>
  );
};
