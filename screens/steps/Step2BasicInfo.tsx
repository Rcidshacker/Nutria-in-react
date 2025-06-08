
import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { StepWrapper } from '../../components/StepWrapper';
import { PRIMARY_COLOR_CLASS } from '../../constants'; // melon

interface Step2BasicInfoProps {
  onNext: () => void;
}

export const Step2BasicInfo: React.FC<Step2BasicInfoProps> = ({ onNext }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      updateFormData({ [name]: checked });
    } else {
      updateFormData({ [name]: value });
    }
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone) && !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number is invalid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <StepWrapper title="Your Basic Information">
      <Input
        label="Full Name"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="e.g. Jane Doe"
      />
      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
      />
      <Input
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+1234567890 or 1234567890"
      />
      <Input
        label="Create Password"
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Minimum 8 characters"
      />
      <Checkbox
        label={
          <span>
            I agree to the <a href="#" onClick={(e)=>{e.preventDefault(); alert("Terms & Conditions link clicked (not implemented).")}} className={`text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400 hover:underline`}>Terms & Conditions</a>
          </span>
        }
        id="agreedToTerms"
        name="agreedToTerms"
        checked={formData.agreedToTerms}
        onChange={handleChange}
        error={errors.agreedToTerms}
      />
      <Button onClick={handleNext} fullWidth className="mt-4">
        Next
      </Button>
    </StepWrapper>
  );
};